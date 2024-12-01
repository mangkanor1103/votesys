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

Route::get('/elections/{electionId}/positions', [CandidateController::class, 'getPositions']);
Route::get('/elections/{electionId}/manage-candidates', [CandidateController::class, 'index']);
// In routes/web.php or routes/api.php
Route::post('/candidates/{electionId}', [CandidateController::class, 'store']);


Route::middleware('auth')->group(function () {
    Route::get('/candidates/{electionId}', [CandidateController::class, 'index'])->name('manage-candidates');
    Route::post('/candidates/{electionId}', [CandidateController::class, 'store']);
});

Route::get('/election', [ElectionController::class, 'showElectionPage']);

Route::get('/api/candidates', [CandidateController::class, 'index']);
Route::post('/api/candidates', [CandidateController::class, 'store']);
Route::delete('/api/candidates/{id}', [CandidateController::class, 'destroy']);
Route::post('/voters/generate', [VoterController::class, 'generateVoterCodes']);

Route::get('/users', function () {
    return Inertia::render('User/Users');
})->name('users.index');


Route::get('/users', function () {
    return Inertia::render('User/Users');
});



Route::post('/positions/{electionId}', [PositionController::class, 'store'])->name('store-position');


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





