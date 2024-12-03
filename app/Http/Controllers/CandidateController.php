<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CandidateController extends Controller
{
    /**
     * Display the candidates for a given position.
     *
     * @param  int  $positionId
     * @return \Illuminate\Http\Response
     */
    public function index($positionId)
    {
        // Fetch the candidates for the given position
        $candidates = Candidate::where('position_id', $positionId)->get();

        return response()->json($candidates);
    }

    /**
     * Store a new candidate or update an existing one.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $positionId
     * @param  int|null  $candidateId
     * @return \Illuminate\Http\Response
     */
    public function storeOrUpdate(Request $request, $positionId, $candidateId = null)
    {
        // Validate the incoming data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'party' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Handle file upload for the candidate's photo (if provided)
        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('public/candidate_photos');
        }

        // Create or update the candidate
        try {
            if ($candidateId) {
                // Update existing candidate
                $candidate = Candidate::findOrFail($candidateId);
                $candidate->update([
                    'name' => $request->input('name'),
                    'party' => $request->input('party'),
                    'photo' => $photoPath ? $photoPath : $candidate->photo,
                ]);
            } else {
                // Create a new candidate
                $candidate = Candidate::create([
                    'position_id' => $positionId,
                    'name' => $request->input('name'),
                    'party' => $request->input('party'),
                    'photo' => $photoPath,
                ]);
            }

            return response()->json(['message' => 'Candidate created/updated successfully.', 'candidate' => $candidate], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while processing the request.'], 500);
        }
    }

    /**
     * Delete a candidate.
     *
     * @param  int  $positionId
     * @param  int  $candidateId
     * @return \Illuminate\Http\Response
     */
    public function destroy($positionId, $candidateId)
    {
        try {
            // Find and delete the candidate
            $candidate = Candidate::where('position_id', $positionId)->findOrFail($candidateId);
            $candidate->delete();

            return response()->json(['message' => 'Candidate deleted successfully.'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Candidate not found.'], 404);
        }
    }
}
