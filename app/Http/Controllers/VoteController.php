<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vote;
use App\Models\Candidate;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class VoteController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'voter_id' => 'required|exists:voters,id',
        'election_id' => 'required|exists:elections,id',
        'votes' => 'required|array',
        'votes.*.position_id' => 'required|exists:positions,id',
        'votes.*.candidate_id' => 'nullable|exists:candidates,id', // Allow null for abstain
    ]);

    try {
        DB::transaction(function () use ($validated) {
            foreach ($validated['votes'] as $vote) {
                // Check if the voter has already voted for this position
                $existingVote = Vote::where('voter_id', $validated['voter_id'])
                    ->where('position_id', $vote['position_id'])
                    ->where('election_id', $validated['election_id'])
                    ->exists();

                if ($existingVote) {
                    throw new \Exception('You have already voted for this position.');
                }

                Vote::updateOrCreate(
                    [
                        'voter_id' => $validated['voter_id'],
                        'position_id' => $vote['position_id'],
                        'election_id' => $validated['election_id'],
                    ],
                    ['candidate_id' => $vote['candidate_id'] === 'abstain' ? null : $vote['candidate_id']]
                );
            }
        });

        return redirect()->route('voter.dashboard')->with('success', 'Votes submitted successfully!');
    } catch (\Exception $e) {
        return back()->withErrors(['msg' => $e->getMessage()]);
    }
}


    public function getVotesByElection($electionId)
    {
        $votes = Vote::where('election_id', $electionId)->get();
        return response()->json(['votes' => $votes]);
    }

}
