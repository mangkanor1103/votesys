<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\Election;
use App\Models\Position;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class VoteController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'voter_id' => 'required|exists:voters,id',
            'election_id' => 'required|exists:elections,id',
            'votes' => 'required|array',
            'votes.*.position_id' => 'required|exists:positions,id',
            'votes.*.candidate_id' => 'nullable|exists:candidates,id', // Candidate ID is nullable if abstained
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if the voter has already voted in the current election
        $existingVotes = Vote::where('voter_id', $request->voter_id)
                             ->where('election_id', $request->election_id)
                             ->exists();

        if ($existingVotes) {
            // Return the error message to be used in frontend
            return Inertia::render('VoterDashboard', [
                'error' => 'You have already voted in this election.',
            ]);
        }

        // Iterate over the votes and store each vote
        foreach ($request->votes as $voteData) {
            $vote = new Vote();
            $vote->voter_id = $request->voter_id;
            $vote->election_id = $request->election_id;
            $vote->position_id = $voteData['position_id'];
            $vote->candidate_id = $voteData['candidate_id'] ?: null; // Null if abstained
            $vote->status = $voteData['candidate_id'] ? 'voted' : 'abstained';
            $vote->save();
        }

        // Return a success message after the vote is successfully submitted
        return Inertia::render('VoterDashboard', [
            'success' => 'Your vote has been submitted successfully!',
        ]);
    }



    public function getVotesByElection($electionId)
{
    $votes = Vote::where('election_id', $electionId)
        ->with(['candidate:id,name', 'position:id,name']) // Include related candidate and position details
        ->get();

    return response()->json(['votes' => $votes]);
}


}
