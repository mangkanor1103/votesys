<?php

use App\Http\Controllers\ElectionController;
use App\http\Controllers\PostController;
use App\Http\Controllers\Profile;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShareController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SubAdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\VoterController;
use App\Http\Controllers\CandidateController;

// Fetch all voters (voter codes) for a given election
// Route to fetch voters for a specific election
Route::get('/voters/{electionId}', [VoterController::class, 'index'])->name('voters.index');
Route::get('/voters/{electionId}', [VoterController::class, 'getVoterCodes']);

// Route to generate voter codes for an election
Route::post('/voters/generate', [VoterController::class, 'generateVoterCodes'])->name('voters.generate');

// Fetch positions for a specific election
Route::get('/positions/{electionId}', [PositionController::class, 'index'])->name('positions.index');

// Create a new position or update an existing one
Route::post('/positions/{electionId}', [PositionController::class, 'storeOrUpdate'])->name('positions.store');
Route::put('/positions/{electionId}/{positionId}', [PositionController::class, 'storeOrUpdate'])->name('positions.update');

// Delete a position
Route::delete('/positions/{electionId}/{positionId}', [PositionController::class, 'destroy'])->name('positions.destroy');

// routes/web.php

// Display candidates for a specific position
Route::get('positions/{positionId}/candidates', [CandidateController::class, 'index']);

// Store a new candidate or update an existing one
Route::post('positions/{positionId}/candidates', [CandidateController::class, 'storeOrUpdate']); // For creating a new candidate
Route::put('positions/{positionId}/candidates/{candidateId}', [CandidateController::class, 'storeOrUpdate']); // For updating an existing candidate

// Delete a candidate
Route::delete('positions/{positionId}/candidates/{candidateId}', [CandidateController::class, 'destroy']);


Route::get('/election', [ElectionController::class, 'showElectionPage']);


Route::get('/users', function () {
    return Inertia::render('User/Users');
})->name('users.index');


Route::get('/users', function () {
    return Inertia::render('User/Users');
});




Route::post('/logout', function () {
    Auth::logout(); // Log the user out
    return redirect('/sub-admin/login'); // Redirect to home or login page
})->name('logout');


// routes/web.php
Route::post('/validate-election-code', [ElectionController::class, 'validateElectionCode'])->name('validate.election.code');
Route::delete('/elections/{id}', [ElectionController::class, 'destroy'])->name('election.delete');
// Define the route for elections.index
Route::get('/elections', [ElectionController::class, 'index'])->name('elections.index');


Route::get('/subdashboard', function () {
    return Inertia::render('SubAdmin/SubDashboard');
})->name('subdashboard');

Route::get('/manage-positions', function () {
    return Inertia::render('SubAdmin/ManagePositions');
})->name('manage-positions');

Route::get('/manage-voters', function () {
    return Inertia::render('SubAdmin/ManageVoters');
})->name('manage-voters');

Route::get('/manage-candidates', function () {
    return Inertia::render('SubAdmin/ManageCandidates');
})->name('manage-candidates');

Route::get('/sub-admin/login', function () {
    return Inertia::render('SubAdmin/Login');  // Make sure the path matches your JSX file
})->name('subAdmin.login');



Route::get('data', [Profile::class,
    'fetchData'
]);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Define routes for authenticated users
Route::middleware(['auth', 'verified'])->group(function () {

    // Route to view the list of elections for superadmins
    Route::get('/superadmin/elections', [ElectionController::class, 'index'])->name('superadmin.elections');

    // Route to create a new election (post data)
    Route::post('/superadmin/elections', [ElectionController::class, 'store'])->name('election.store');

    // Route to view the details of a specific election
    Route::get('/superadmin/elections/{id}', [ElectionController::class, 'show'])->name('superadmin.elections.show');
});


// Profile routes for authenticated users
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';





