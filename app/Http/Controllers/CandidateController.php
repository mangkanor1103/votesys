<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Position;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    // Store a new candidate
    public function store(Request $request, $positionId)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            // Add other validation rules for candidate data if necessary
        ]);

        // Create the new candidate for the given position
        $candidate = new Candidate();
        $candidate->name = $request->name;
        $candidate->position_id = $positionId;
        $candidate->photo_url = $request->photo_url; // Optional
        $candidate->save();

        // Return a response
        return response()->json($candidate, 201);
    }


    // Retrieve candidates for a given position
    public function index($positionId)
    {
        $candidates = Candidate::where('position_id', $positionId)->get();
        return response()->json($candidates);
    }
}
