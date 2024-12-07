<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vote;
use App\Models\Candidate;
use App\Models\Position;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class VoteController extends Controller
{
    // Method to fetch the votes for a given election and voter
    public function index($electionId, $voterId)
    {
        // Retrieve the positions for this election
        $positions = Position::where('election_id', $electionId)
            ->with(['candidates']) // Load candidates for each position
            ->get();

        // Retrieve the stored votes for the voter
        $storedVotes = Vote::where('election_id', $electionId)
            ->where('voter_id', $voterId)
            ->get()
            ->pluck('candidate_id', 'position_id'); // Map votes by position_id

        return Inertia::render('VoterDashboard', [
            'voterId' => $voterId,
            'electionName' => 'Election Name', // Replace with actual election name if needed
            'electionId' => $electionId,
            'positions' => $positions,
            'storedVotes' => $storedVotes, // Pass the stored votes to the frontend
        ]);
    }

    // Store vote method (unchanged)
public function store(Request $request)
{
    $validated = $request->validate([
        'voter_id' => 'required|exists:voters,id',
        'election_id' => 'required|exists:elections,id',
        'votes' => 'required|array',
        'votes.*.position_id' => 'required|exists:positions,id',
        'votes.*.candidate_id' => 'required|exists:candidates,id',
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
                    return back()->withErrors(['msg' => 'You have already voted for this position.']);
                }

                Vote::updateOrCreate(
                    [
                        'voter_id' => $validated['voter_id'],
                        'position_id' => $vote['position_id'],
                        'election_id' => $validated['election_id'],
                    ],
                    ['candidate_id' => $vote['candidate_id']]
                );
            }
        });

        return redirect()->route('vote.thanks');
    } catch (\Exception $e) {
        return back()->withErrors(['msg' => 'An error occurred while submitting your vote. Please try again later.']);
    }
}

}
