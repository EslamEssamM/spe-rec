# SPE Suez Recruitment Application - Development Instructions

## Project Overview
Build a comprehensive recruitment management system for SPE (Society of Petroleum Engineers) Suez Student Chapter 2026 season. This Laravel application with React/Inertia frontend will handle student applications and provide HR management capabilities.

## Application Requirements

### Core Features
1. **Public Pages**: Information about SPE Suez, committees, segments
2. **Recruitment Form**: Multi-step application form for students
3. **Admin Panel**: HR dashboard for managing applications
4. **Data Export**: Excel export functionality for applications
5. **Committee Management**: Mark committees as completed/closed

## Database Schema

### Tables to Create

#### 1. Committees Table
```sql
php artisan make:model Committee -mfs
```
- `id` (primary key)
- `name` (string, required)
- `description` (text, nullable)
- `responsibilities` (text, nullable)
- `is_open` (boolean, default true) - controls if committee accepts applications
- `created_at`, `updated_at`

#### 2. Applications Table
```sql
php artisan make:model Application -mfs
```
- `id` (primary key)
- `full_name` (string, required)
- `email` (string, required, unique)
- `mobile_number` (string, required)
- `facebook_link` (string, required)
- `university` (string, required)
- `faculty` (string, required)
- `department` (string, required)
- `academic_year` (string, required)
- `previous_experience` (text, required)
- `why_spe` (text, required)
- `expected_benefits` (text, required)
- `committee_id` (foreign key to committees)
- `why_committee` (text, required)
- `committee_knowledge` (text, required)
- `open_space` (text, nullable)
- `status` (enum: 'pending', 'reviewed', 'accepted', 'rejected', default 'pending')
- `submitted_at` (timestamp)
- `created_at`, `updated_at`

#### 3. Admin Users Table (extend existing users)
Add to existing users migration:
- `role` (enum: 'user', 'admin', 'hr', default 'user')
- `is_active` (boolean, default true)

## Routes Structure

### Public Routes (`routes/web.php`)
```php
// Public pages
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/committees', [CommitteeController::class, 'public'])->name('committees.public');
Route::get('/apply', [ApplicationController::class, 'create'])->name('applications.create');
Route::post('/apply', [ApplicationController::class, 'store'])->name('applications.store');
Route::get('/application/success', [ApplicationController::class, 'success'])->name('applications.success');
```

### Admin Routes (`routes/web.php`)
```php
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::resource('applications', AdminApplicationController::class);
    Route::resource('committees', AdminCommitteeController::class);
    Route::post('/applications/{application}/status', [AdminApplicationController::class, 'updateStatus'])->name('admin.applications.status');
    Route::get('/applications/export', [AdminApplicationController::class, 'export'])->name('admin.applications.export');
    Route::post('/committees/{committee}/toggle', [AdminCommitteeController::class, 'toggleStatus'])->name('admin.committees.toggle');
});
```

## Controllers to Create

### 1. Application Controller
```bash
php artisan make:controller ApplicationController
```
**Methods needed:**
- `create()` - Show application form with available committees
- `store()` - Validate and save application
- `success()` - Show success page

### 2. Admin Application Controller
```bash
php artisan make:controller Admin/AdminApplicationController
```
**Methods needed:**
- `index()` - List all applications with filtering
- `show()` - View single application details
- `updateStatus()` - Change application status
- `export()` - Export applications to Excel

### 3. Admin Committee Controller
```bash
php artisan make:controller Admin/AdminCommitteeController
```
**Methods needed:**
- `index()` - List committees with status
- `create()`, `store()` - Add new committees
- `edit()`, `update()` - Edit committee details
- `toggleStatus()` - Open/close committee for applications

### 4. Committee Controller (Public)
```bash
php artisan make:controller CommitteeController
```
**Methods needed:**
- `public()` - Show public committee information

## Form Requests

### Application Form Request
```bash
php artisan make:request StoreApplicationRequest
```

**Validation Rules:**
```php
public function rules()
{
    return [
        'full_name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email', 'unique:applications,email'],
        'mobile_number' => ['required', 'string', 'max:20'],
        'facebook_link' => ['required', 'url'],
        'university' => ['required', 'string', 'max:255'],
        'faculty' => ['required', 'string', 'max:255'],
        'department' => ['required', 'string', 'max:255'],
        'academic_year' => ['required', 'string', 'in:First,Second,Third,Fourth,Fifth'],
        'previous_experience' => ['required', 'string', 'min:10'],
        'why_spe' => ['required', 'string', 'min:10'],
        'expected_benefits' => ['required', 'string', 'min:10'],
        'committee_id' => ['required', 'exists:committees,id'],
        'why_committee' => ['required', 'string', 'min:10'],
        'committee_knowledge' => ['required', 'string', 'min:10'],
        'open_space' => ['nullable', 'string'],
    ];
}
```

## React Components Structure

### Frontend Pages (`resources/js/pages/`)

#### 1. Public Pages
- `Home.tsx` - Landing page with SPE info
- `About.tsx` - About SPE Suez page
- `Committees/Index.tsx` - Public committee information
- `Application/Create.tsx` - Multi-step application form
- `Application/Success.tsx` - Success page after submission

#### 2. Admin Pages
- `Admin/Dashboard.tsx` - Admin dashboard with statistics
- `Admin/Applications/Index.tsx` - Applications list with filters
- `Admin/Applications/Show.tsx` - Single application view
- `Admin/Committees/Index.tsx` - Committee management
- `Admin/Committees/Create.tsx` - Add new committee
- `Admin/Committees/Edit.tsx` - Edit committee

### Components (`resources/js/components/`)

#### Application Form Components
- `ApplicationForm/PersonalInfo.tsx` - Step 2 component
- `ApplicationForm/EducationalInfo.tsx` - Step 3 component
- `ApplicationForm/AboutSPE.tsx` - Step 4 component
- `ApplicationForm/AboutCommittee.tsx` - Step 5 component
- `ApplicationForm/StepIndicator.tsx` - Progress indicator
- `ApplicationForm/NavigationButtons.tsx` - Next/Previous buttons

#### Admin Components
- `Admin/ApplicationCard.tsx` - Application summary card
- `Admin/StatusBadge.tsx` - Status indicator
- `Admin/FilterBar.tsx` - Application filtering
- `Admin/ExportButton.tsx` - Excel export button
- `Admin/CommitteeToggle.tsx` - Open/close committee toggle

## Key Features Implementation

### 1. Multi-Step Application Form
- Use React state management for form steps
- Implement form validation for each step
- Save progress locally (localStorage)
- Show progress indicator
- Allow navigation between completed steps

### 2. Admin Authentication
```bash
php artisan make:middleware AdminMiddleware
```
- Create admin middleware to check user role
- Implement role-based access control
- Add admin seeder for initial admin user

### 3. Excel Export
```bash
composer require maatwebsite/excel
```
- Install Laravel Excel package
- Create export class for applications
- Include filtering options in export
- Format Excel with proper headers

### 4. Committee Management
- Toggle committee status (open/closed)
- Show "Applications Closed" for closed committees
- Prevent applications to closed committees
- Display committee status in admin panel

### 5. Application Status Management
- Implement status workflow (pending → reviewed → accepted/rejected)
- Add status change logging
- Email notifications for status changes (optional)
- Bulk status updates

## Styling Guidelines

### Tailwind Classes
- Use consistent color scheme (SPE brand colors if available)
- Implement responsive design for mobile users
- Use proper form styling with validation states
- Create consistent button and card components
- Add loading states for form submissions

### Form Styling
- Multi-step progress indicator
- Clear section headers and descriptions
- Proper input spacing and validation messages
- Mobile-friendly form layout
- Accessibility considerations

## Security Considerations

### Data Protection
- Validate all user inputs
- Sanitize data before storage
- Implement CSRF protection
- Rate limiting for form submissions
- Secure file uploads if needed

### Admin Security
- Strong authentication for admin users
- Role-based permissions
- Audit logging for admin actions
- Secure export functionality
- Session management

## Testing Requirements

### Feature Tests
```bash
php artisan make:test ApplicationSubmissionTest
php artisan make:test AdminApplicationManagementTest
php artisan make:test CommitteeManagementTest
```

**Test Coverage:**
- Application form submission flow
- Form validation (all fields)
- Admin authentication and authorization
- Committee status management
- Excel export functionality
- Status update workflows

## Seeding Data

### Committee Seeder
Create realistic committees:
- Technical Committee
- Human Resources Committee
- Public Relations Committee
- Finance Committee
- Events Committee
- Media Committee

### Admin User Seeder
- Create default admin user
- Set proper roles and permissions

## Additional Features

### Email Notifications
- Application submission confirmation
- Status change notifications
- Admin alerts for new applications

### Dashboard Analytics
- Total applications count
- Applications per committee
- Status distribution charts
- Recent applications timeline

### Search and Filtering
- Search applications by name/email
- Filter by committee, status, date
- Sort by submission date, status
- Pagination for large datasets

## Deployment Checklist

### Environment Setup
- Configure database connection
- Set up mail configuration
- Configure app URL and keys
- Set proper file permissions

### Production Optimizations
- Run `php artisan config:cache`
- Run `php artisan route:cache`
- Build frontend assets
- Set up proper logging
- Configure queue workers if needed

## Implementation Priority

### Phase 1 (Core Features)
1. Database migrations and models
2. Basic authentication system
3. Public pages (home, about, committees)
4. Application form (all 5 sections)
5. Basic admin panel

### Phase 2 (Admin Features)
1. Application management interface
2. Excel export functionality
3. Committee management
4. Status update system

### Phase 3 (Enhancements)
1. Advanced filtering and search
2. Dashboard analytics
3. Email notifications
4. Performance optimizations

## Best Practices

### Laravel Conventions
- Follow PSR-12 coding standards
- Use Eloquent relationships properly
- Implement proper validation
- Use form requests for validation
- Follow RESTful routing conventions

### React/Inertia Best Practices
- Use TypeScript for type safety
- Implement proper error handling
- Use loading states for better UX
- Optimize component re-renders
- Follow React Hook best practices

### Database Best Practices
- Use database transactions for complex operations
- Implement proper indexing
- Use foreign key constraints
- Add soft deletes if needed
- Optimize queries with eager loading

This comprehensive guide ensures a professional, secure, and user-friendly recruitment management system for SPE Suez Student Chapter.