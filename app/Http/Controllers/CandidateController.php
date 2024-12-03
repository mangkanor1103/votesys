<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    // Display the candidates for a specific position and election
    public function index($electionId, $positionId)
    {
        $candidates = Candidate::where('position_id', $positionId)->where('election_id', $electionId)->get();
        return response()->json($candidates);
    }

    // Store a new candidate
    public function store(Request $request)
    {
        $request->validate([
            'election_id' => 'required|exists:elections,id',
            'position_id' => 'required|exists:positions,id',
            'name' => 'required|string|max:255',
            'platform' => 'required|string|max:1000',
        ]);

        $candidate = Candidate::create([
            'election_id' => $request->election_id,
            'position_id' => $request->position_id,
            'name' => $request->name,
            'platform' => $request->platform,
        ]);

        return response()->json($candidate, 201);
    }

    // Update an existing candidate
    public function update(Request $request, $id)
    {
        $candidate = Candidate::findOrFail($id);

        // Validate the incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'platform' => 'required|string|max:1000',
        ]);

        // Update candidate attributes
        $candidate->update([
            'name' => $request->name,
            'platform' => $request->platform,
        ]);

        return response()->json($candidate);  // Return the updated candidate
    }

    // Delete a candidate
    public function destroy($id)
    {
        $candidate = Candidate::findOrFail($id);
        $candidate->delete();
        return response()->json(['message' => 'Candidate deleted successfully.']);
    }
}
