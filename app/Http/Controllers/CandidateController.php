<?php
namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CandidateController extends Controller
{
    // Display the candidates for a specific position and election
    public function index($electionId, $positionId)
    {
        $candidates = Candidate::where('position_id', $positionId)
            ->where('election_id', $electionId)
            ->get();
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
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Photo validation
        ]);

        // Handle file upload
        $photoPath = $request->file('photo')->store('candidates', 'public');

        $candidate = Candidate::create([
            'election_id' => $request->election_id,
            'position_id' => $request->position_id,
            'name' => $request->name,
            'platform' => $request->platform,
            'photo' => $photoPath, // Save photo path in the database
        ]);

        return response()->json($candidate, 201);
    }

    // Update an existing candidate
    public function update(Request $request, $id)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'platform' => 'required|string',
        'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    $candidate = Candidate::findOrFail($id);

    $candidate->name = $request->input('name');
    $candidate->platform = $request->input('platform');

    if ($request->hasFile('photo')) {
        // Delete old photo if exists
        if ($candidate->photo) {
            Storage::delete($candidate->photo);
        }

        // Store new photo
        $path = $request->file('photo')->store('candidate_photos');
        $candidate->photo = $path;
    }

    $candidate->save();

    return response()->json($candidate, 200);
}


    // Delete a candidate
    public function destroy($id)
    {
        $candidate = Candidate::findOrFail($id);

        // Delete photo file if exists
        if ($candidate->photo && Storage::disk('public')->exists($candidate->photo)) {
            Storage::disk('public')->delete($candidate->photo);
        }

        $candidate->delete();
        return response()->json(['message' => 'Candidate deleted successfully.']);
    }
    public function uploadPhoto(Request $request)
    {
        // Validate the file (you can add additional validations like file type and size)
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Store the photo and get the file path
        $path = $request->file('photo')->store('candidate_photos', 'public');

        // Return the stored path or a response
        return response()->json(['path' => $path], 200);
    }
    
    public function getCandidates($positionId)
{
    $candidates = Candidate::where('position_id', $positionId)
        ->get(['id', 'name', 'photo']); // Fetch only relevant fields
    return response()->json($candidates);
}

}
