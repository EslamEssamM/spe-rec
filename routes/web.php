<?php

use App\Http\Controllers\Admin\AdminApplicationController;
use App\Http\Controllers\Admin\AdminCommitteeController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CommitteeController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/committees', [CommitteeController::class, 'public'])->name('committees.public');

// Application routes
Route::get('/apply', [ApplicationController::class, 'create'])->name('applications.create');
Route::post('/apply', [ApplicationController::class, 'store'])->name('applications.store');
Route::get('/application/success', [ApplicationController::class, 'success'])->name('applications.success');

// Authenticated user routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
});

// Admin routes (Phase 5)
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

    // Applications management
    Route::get('/applications', [AdminApplicationController::class, 'index'])->name('applications.index');
    Route::get('/applications/export', [AdminApplicationController::class, 'export'])->name('applications.export');
    Route::get('/applications/{application}', [AdminApplicationController::class, 'show'])->name('applications.show');
    Route::post('/applications/{application}/status', [AdminApplicationController::class, 'updateStatus'])->name('applications.status');

    // Committees management
    Route::resource('committees', AdminCommitteeController::class);
    Route::post('/committees/{committee}/toggle', [AdminCommitteeController::class, 'toggleStatus'])->name('committees.toggle');
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
