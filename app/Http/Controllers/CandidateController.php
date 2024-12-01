<?php
namespace App\Http\Controllers;

use App\Models\Election;
use App\Models\Position;
use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    public function index($electionId)
    {
        $election = Election::with('positions.candidates')->findOrFail($electionId);

        return inertia('ManageCandidates', [
            'electionId' => $electionId,
            'positions' => $election->positions,
            'candidates' => $election->positions->flatMap->candidates,
        ]);
    }
    public function getPositions($electionId)
{
    $election = Election::with('positions')->findOrFail($electionId);

    return response()->json([
        'positions' => $election->positions,
    ]);
}

// In CandidateController.php
public function store(Request $request, $electionId)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'position_id' => 'required|exists:positions,id',
    ]);

    $candidate = Candidate::create([
        'name' => $request->name,
        'position_id' => $request->position_id,
        'election_id' => $electionId, // Store the election_id from the URL parameter
    ]);

    return response()->json($candidate, 201); // Return the created candidate
}

}
