<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Todo;
use Illuminate\Http\Request;
use App\Http\Controllers\TodoController;

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Here Todo App Routes********************************

// Route::get('/todos',function(){

//     // $todos = Todo::latest()->get();
    
//     return Inertia::render('Todos');

// });

Route::get('/todos',[TodoController::class, 'index'])->name('todos.index');
Route::post('/todos', [TodoController::class, 'store']);

Route::delete('/todos/bulk-delete', [TodoController::class,'bulkDestroy']);

Route::delete('/todos/{todo}',[TodoController::class, 'destroy'])->name('todos.destroy');

Route::put('/todos/{todo}', [TodoController::class, 'update']);





require __DIR__.'/auth.php';
