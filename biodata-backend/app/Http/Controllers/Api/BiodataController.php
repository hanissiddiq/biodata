<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Biodata;
use Illuminate\Http\Request;

class BiodataController extends Controller
{
    public function index()
    {
        return Biodata::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'email' => 'required|email|unique:biodatas,email',
            'foto' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        // Upload file
        $fotoPath = null;
        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('biodata', 'public');
        }

        $biodata = Biodata::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'foto' => $fotoPath,
        ]);

        return response()->json([
            'message' => 'Data berhasil disimpan',
            'data' => $biodata
        ], 201);
    }
}
