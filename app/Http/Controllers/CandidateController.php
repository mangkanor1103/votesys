<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    // Fetch all candidates
    public function index()
    {
        $candidates = Candidate::all();
        return response()->json($candidates);
    }

    // Store a new candidate
    public function store(Request $request)
    {
        $candidate = Candidate::create([
            'name' => $request->name,
            'position' => $request->position,
        ]);

        return response()->json(['success' => true, 'candidate' => $candidate]);
    }

    // Delete a candidate
    public function destroy($id)
    {
        $candidate = Candidate::find($id);
        if ($candidate) {
            $candidate->delete();
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false]);
    }
}
