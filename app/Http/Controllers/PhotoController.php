<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http; // For API requests
use Illuminate\Support\Facades\Log;

class PhotoController extends Controller
{
    public function store(Request $request)
    {
        // Validate the uploaded photo
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Store the photo in the public storage with a unique name
        $filePath = $request->file('photo')->storeAs('photos', uniqid() . '.' . $request->file('photo')->extension(), 'public');

        // Create a record for the uploaded photo
        $photo = Photo::create(['photo_path' => $filePath]);

        // Send the photo to Django for text extraction
        $response = Http::post('http://127.0.0.1:3000/extract-text', [
            'photo_path' => $filePath,
        ]);

        // Check if the response is successful and contains 'text' key
        if ($response->successful() && isset($response->json()['text'])) {
            // Get the extracted text from the response
            $extractedText = $response->json()['text'];
        } else {
            // Handle case if text extraction failed or key doesn't exist
            $extractedText = 'Text extraction failed or no text found. Please try again.';
            // Optionally log the error
            Log::error("Text extraction failed: " . $response->body());
        }

        // Optionally, save the extracted text in the database or perform other actions
        $photo->update(['extracted_text' => $extractedText]);

        // Return a JSON response with the photo and extracted text
        return response()->json([
            'message' => 'Photo uploaded successfully.',
            'redirect' => '/re-student',
            'photo' => $photo,
            'extracted_text' => $extractedText, // Include the extracted text in the response
        ]);
    }
}
