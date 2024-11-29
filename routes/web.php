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

Route::get('/sub-admin/login', [AuthenticatedSessionController::class, 'create'])->name('sub-admin.login');
Route::post('/sub-admin/login', [AuthenticatedSessionController::class, 'store'])->name('sub-admin.login.store');

// Protected routes for sub-admin after login
Route::middleware('auth:sub-admin')->get('/sub-admin/dashboard', [SubAdminController::class, 'dashboard'])->name('sub-admin.dashboard');

// Logout sub-admin
Route::post('/sub-admin/logout', [AuthenticatedSessionController::class, 'destroy'])->name('sub-admin.logout');

Route::get('/sub-admin/login', function () {
    return Inertia::render('SubAdmin/Login');
});


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

Route::get('/sub-admin/login', function () {
    return Inertia::render('SubAdmin/Login');  // Make sure the path matches your JSX file
})->name('subAdmin.login');

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

// Example simple routes for testing or other purposes
Route::get('/welcome', function(){
    return view('app');
});

Route::get('/Welcome', function(){
    return 'Hello World, I am Rhea!';
});

Route::get('/header', function(){
    return response('<h1></h1>');
});

Route::get('/header', function(){
    return response('<h1></h1>')
        ->header('Content-Type','text/plain')
        ->header('foo','bar');
});




