<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vote;

class VoteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'voter_id' => 'required|exists:voters,id',
            'votes' => 'required|array',
            'votes.*.position_id' => 'required|exists:positions,id',
            'votes.*.candidate_id' => 'required|exists:candidates,id',
        ]);

        foreach ($validated['votes'] as $vote) {
            Vote::updateOrCreate(
                [
                    'voter_id' => $validated['voter_id'],
                    'position_id' => $vote['position_id'],
                ],
                ['candidate_id' => $vote['candidate_id']]
            );
        }

        return response()->json(['success' => 'Votes submitted successfully!'], 200);
    }
}
