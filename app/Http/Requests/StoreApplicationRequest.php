<?php

namespace App\Http\Requests;

use App\Models\Committee;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:applications,email'],
            'mobile' => ['required', 'string', 'max:20'],
            'facebook_link' => ['required', 'url'],
            'personal_photo' => ['required', 'image', 'mimes:jpeg,jpg,png', 'max:2048'],
            'university' => ['required', 'string', 'max:255'],
            'faculty' => ['required', 'string', 'max:255'],
            'department' => ['required', 'string', 'max:255'],
            'academic_year' => [
                'required',
                'string',
                Rule::in(['preparatory', 'first', 'second', 'third', 'fourth', 'fifth']),
            ],
            'previous_experience' => ['required', 'string', 'min:10'],
            'why_applying' => [ 'string'],
            'how_benefit' => [ 'string' ],
            'committee_choices' => ['required', 'array', 'min:1', 'max:2'],
            'committee_choices.*' => [
                'required',
                'string',
                'distinct',
                'max:255',
                Rule::exists('committees', 'name')->where('is_open', true),
            ],
            'why_committee' => ['required', 'string', 'min:10'],
            'committee_responsibilities' => ['required', 'string', 'min:10'],
            'open_space' => ['nullable', 'string'],
        ];
    }

    /**
     * Transform the data after validation to match database field names.
     */
    public function validated($key = null, $default = null)
    {
        return parent::validated($key, $default);
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'full_name.required' => 'Full name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email has already been used for an application.',
            'mobile.required' => 'Mobile number is required.',
            'mobile.max' => 'Mobile number must not exceed 20 characters.',
            'facebook_link.required' => 'Facebook account link is required.',
            'facebook_link.url' => 'Please enter a valid Facebook URL.',
            'personal_photo.required' => 'Personal photo is required.',
            'personal_photo.image' => 'The file must be an image.',
            'personal_photo.mimes' => 'The photo must be a JPEG, JPG, or PNG file.',
            'personal_photo.max' => 'The photo size must not exceed 2MB.',
            'university.required' => 'University is required.',
            'faculty.required' => 'Faculty is required.',
            'department.required' => 'Department is required.',
            'academic_year.required' => 'Academic year is required.',
            'academic_year.in' => 'Please select a valid academic year.',
            'gpa.numeric' => 'GPA must be a number.',
            'gpa.min' => 'GPA must be at least 0.',
            'gpa.max' => 'GPA must not exceed 4.',
            'previous_experience.required' => 'Please describe your previous experience.',
            'previous_experience.min' => 'Previous experience description must be at least 10 characters.',
            'why_applying.required' => 'Please explain why you are applying for SPE Suez.',
            'why_applying.min' => 'Your answer must be at least 10 characters.',
            'how_benefit.required' => 'Please explain how you will benefit from joining SPE.',
            'how_benefit.min' => 'Your answer must be at least 10 characters.',
            'committee_choices.required' => 'Please select at least one committee.',
            'committee_choices.array' => 'Committee selections must be sent as a list.',
            'committee_choices.min' => 'Select at least one committee.',
            'committee_choices.max' => 'You may select at most two committees.',
            'committee_choices.*.distinct' => 'Committee selections must be unique.',
            'committee_choices.*.exists' => 'One or more selected committees are either invalid or currently closed.',
            'why_committee.required' => 'Please explain why you chose this committee.',
            'why_committee.min' => 'Your answer must be at least 10 characters.',
            'committee_responsibilities.required' => 'Please describe your knowledge about the committee responsibilities.',
            'committee_responsibilities.min' => 'Your answer must be at least 10 characters.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'full_name' => 'full name',
            'email' => 'email address',
            'mobile' => 'mobile number',
            'facebook_link' => 'Facebook link',
            'personal_photo' => 'personal photo',
            'university' => 'university',
            'faculty' => 'faculty',
            'department' => 'department',
            'academic_year' => 'academic year',
            'gpa' => 'GPA',
            'previous_experience' => 'previous experience',
            'why_applying' => 'why SPE Suez',
            'how_benefit' => 'expected benefits',
            'committee_choices' => 'committee selection',
            'why_committee' => 'why this committee',
            'committee_responsibilities' => 'committee knowledge',
            'open_space' => 'additional comments',
        ];
    }
}
