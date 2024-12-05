<?php
// app/Http/Controllers/ElectionResultController.php

namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\Position;
use App\Models\Candidate;
use Illuminate\Http\Request;

class ElectionResultController extends Controller
{
    public function index($electionId)
    {
        // Fetch positions with their associated candidates and vote counts
        $positions = Position::with(['candidates' => function ($query) use ($electionId) {
            $query->whereHas('votes', function ($query) use ($electionId) {
                $query->where('election_id', $electionId);
            });
        }])->get();

        // Prepare results with vote counts for each candidate
        foreach ($positions as $position) {
            foreach ($position->candidates as $candidate) {
                $candidate->vote_count = Vote::where('candidate_id', $candidate->id)
                                             ->whereHas('position', function($query) use ($position) {
                                                 $query->where('position_id', $position->id);
                                             })
                                             ->count();
            }
        }

        return view('election_results', compact('positions'));
    }
}

