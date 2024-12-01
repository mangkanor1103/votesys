<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class PositionController extends Controller
{
    public function store(Request $request, $electionId)
    {
        // Log incoming request data for debugging
        Log::info('Request Data:', $request->all());
        Log::info('Election ID:', [$electionId]);

        // Validate incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'max_votes' => 'required|integer|min:1',
        ]);

        // Store the new position in the database
        try {
            Position::create([
                'election_id' => $electionId,
                'name' => $request->name,
                'max_votes' => $request->max_votes,
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating position: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create position'], 500);
        }

        // Redirect or return success
        return redirect()->route('manage-positions', $electionId);
    }
}
