<?php
namespace App\Http\Controllers;

use App\Models\Share;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubAdminController extends Controller
{
    public function login()
    {
        // Return a view for the sub-admin login
        return view('SubAdmin.Login');
    }
}
