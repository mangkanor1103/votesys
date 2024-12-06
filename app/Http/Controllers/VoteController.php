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
            'votes' => 'required|array',
            'votes.*.position_id' => 'required|exists:positions,id',
            'votes.*.candidate_id' => 'required|exists:candidates,id',
        ]);

        DB::transaction(function () use ($validated) {
            foreach ($validated['votes'] as $vote) {
                Vote::updateOrCreate(
                    [
                        'voter_id' => $validated['voter_id'],
                        'position_id' => $vote['position_id'],
                    ],
                    ['candidate_id' => $vote['candidate_id']]
                );
            }
        });

        // Fetch candidate data including photo for the voter dashboard
        $candidateIds = collect($validated['votes'])->pluck('candidate_id');
        $candidates = Candidate::whereIn('id', $candidateIds)
            ->get(['id', 'name', 'photo']); // Adjust the fields based on your Candidate model

        // Pass the candidates data to Inertia
        return Inertia::render('VoterDashboard', [
            'success' => 'Votes submitted successfully!',
            'candidates' => $candidates, // Pass the candidates to the frontend
        ]);
    }
    public function index()
    {
        $votes = Vote::with(['position', 'candidate'])->get();

    return response()->json(['votes' => $votes]);

    }


}
