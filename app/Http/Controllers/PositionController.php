<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PositionController extends Controller
{
    /**
     * Display the positions for a given election.
     *
     * @param  int  $electionId
     * @return \Illuminate\Http\Response
     */
    public function index($electionId)
    {
        // Fetch the positions for the given election
        $positions = Position::where('election_id', $electionId)->get();

        return response()->json($positions);
    }

    /**
     * Store a new position or update an existing one.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $electionId
     * @param  int|null  $positionId
     * @return \Illuminate\Http\Response
     */
    public function storeOrUpdate(Request $request, $electionId, $positionId = null)
    {
        // Validate the incoming data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'max_votes' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Create or update the position
        if ($positionId) {
            // Update existing position
            $position = Position::findOrFail($positionId);
            $position->update([
                'name' => $request->input('name'),
                'max_votes' => $request->input('max_votes'),
            ]);
        } else {
            // Create a new position
            $position = Position::create([
                'election_id' => $electionId,
                'name' => $request->input('name'),
                'max_votes' => $request->input('max_votes'),
            ]);
        }

        return response()->json($position);
    }

    /**
     * Delete a position.
     *
     * @param  int  $electionId
     * @param  int  $positionId
     * @return \Illuminate\Http\Response
     */
    public function destroy($electionId, $positionId)
    {
        // Find the position and delete it
        $position = Position::where('election_id', $electionId)->findOrFail($positionId);
        $position->delete();

        return response()->json(['message' => 'Position deleted successfully.']);
    }
}
