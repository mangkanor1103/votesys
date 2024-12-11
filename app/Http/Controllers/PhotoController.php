<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photo;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $filePath = $request->file('photo')->store('photos', 'public');

    $photo = Photo::create(['photo_path' => $filePath]);

    return response()->json([
        'message' => 'Photo uploaded successfully.',
        'redirect' => '/re-student', // Add redirect URL here
        'photo' => $photo,
    ]);
}

}

