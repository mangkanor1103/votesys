<?php
// app/Http/Controllers/CandidateController.php
namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Position;
use App\Models\Election;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    // Display the candidates for a specific position and election
    public function index($electionId, $positionId)
    {
        $position = Position::findOrFail($positionId);
        $election = Election::findOrFail($electionId);
        $candidates = Candidate::where('position_id', $positionId)->where('election_id', $electionId)->get();

        return response()->json($candidates); // Return candidates as JSON to the frontend
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

        return response()->json($candidate, 201); // Return the created candidate as JSON
    }
}
