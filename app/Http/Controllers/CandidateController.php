<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CandidateController extends Controller
{
    public function index()
    {
        $candidates = Candidate::all();
        $positions = Position::all();
        return view('candidates.index', compact('candidates', 'positions'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'party' => 'required|string|max:255',
            'position_id' => 'required|exists:positions,id',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $photoPath = null;
        if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
            $photoPath = $request->file('photo')->store('candidates_photos', 'public');
        }

        Candidate::create([
            'name' => $request->name,
            'party' => $request->party,
            'position_id' => $request->position_id,
            'photo' => $photoPath,
        ]);

        return redirect()->route('candidates.index')->with('success', 'Candidate created successfully.');
    }

    public function edit($id)
    {
        $candidate = Candidate::findOrFail($id);
        $positions = Position::all();
        return view('candidates.edit', compact('candidate', 'positions'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'party' => 'required|string|max:255',
            'position_id' => 'required|exists:positions,id',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $candidate = Candidate::findOrFail($id);

        // Handle photo update
        $photoPath = $candidate->photo;
        if ($request->hasFile('photo')) {
            // Delete the old photo if exists
            if ($photoPath && Storage::exists('public/' . $photoPath)) {
                Storage::delete('public/' . $photoPath);
            }

            // Store the new photo
            $photoPath = $request->file('photo')->store('candidates_photos', 'public');
        }

        $candidate->update([
            'name' => $request->name,
            'party' => $request->party,
            'position_id' => $request->position_id,
            'photo' => $photoPath,
        ]);

        return redirect()->route('candidates.index')->with('success', 'Candidate updated successfully.');
    }

    public function destroy($id)
    {
        $candidate = Candidate::findOrFail($id);

        // Delete the photo if exists
        if ($candidate->photo && Storage::exists('public/' . $candidate->photo)) {
            Storage::delete('public/' . $candidate->photo);
        }

        $candidate->delete();

        return redirect()->route('candidates.index')->with('success', 'Candidate deleted successfully.');
    }
}
