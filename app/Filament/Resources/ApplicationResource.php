<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ApplicationResource\Pages;
use App\Models\Application;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ApplicationResource extends Resource
{
    protected static ?string $model = Application::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'Application Management';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'full_name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Personal Information')
                    ->schema([
                        Forms\Components\TextInput::make('full_name')
                            ->label('Full Name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->label('Email Address')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('mobile')
                            ->label('Mobile Number')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('facebook_link')
                            ->label('Facebook Link')
                            ->url()
                            ->maxLength(255),
                    ])->columns(2),

                Forms\Components\Section::make('Educational Information')
                    ->schema([
                        Forms\Components\TextInput::make('university')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('faculty')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('department')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('academic_year')
                            ->label('Academic Year')
                            ->required()
                            ->maxLength(255),
                    ])->columns(2),

                Forms\Components\Section::make('Application Details')
                    ->schema([
                        Forms\Components\Textarea::make('previous_experience')
                            ->label('Previous Experience')
                            ->rows(3),
                        Forms\Components\Textarea::make('why_applying')
                            ->label('Why do you want to join SPE?')
                            ->required()
                            ->rows(3),
                        Forms\Components\Textarea::make('how_benefit')
                            ->label('What do you expect to benefit from SPE?')
                            ->required()
                            ->rows(3),
                        Forms\Components\CheckboxList::make('committee_choices')
                            ->label('Committee Preferences')
                            ->options([
                                'technical' => 'Technical',
                                'marketing' => 'Marketing',
                                'events' => 'Events',
                                'membership' => 'Membership',
                                'finance' => 'Finance',
                            ])
                            ->required(),
                        Forms\Components\Textarea::make('why_committee')
                            ->label('Why these committees?')
                            ->required()
                            ->rows(3),
                        Forms\Components\Textarea::make('committee_responsibilities')
                            ->label('What do you know about committee responsibilities?')
                            ->required()
                            ->rows(3),
                        Forms\Components\Textarea::make('open_space')
                            ->label('Additional Comments')
                            ->rows(3),
                    ]),

                Forms\Components\Section::make('Application Status')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'reviewed' => 'Reviewed',
                                'accepted' => 'Accepted',
                                'rejected' => 'Rejected',
                            ])
                            ->default('pending')
                            ->required(),
                        Forms\Components\DateTimePicker::make('submitted_at')
                            ->label('Submitted At'),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('full_name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('university')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('committee_choices')
                    ->badge()
                    ->formatStateUsing(function ($state) {
                        if (is_array($state)) {
                            return collect($state)->join(', ');
                        }

                        return $state;
                    }),
                Tables\Columns\SelectColumn::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'reviewed' => 'Reviewed',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                    ]),
                Tables\Columns\TextColumn::make('submitted_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'reviewed' => 'Reviewed',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                    ])
                    ->multiple(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListApplications::route('/'),
            'create' => Pages\CreateApplication::route('/create'),
            'view' => Pages\ViewApplication::route('/{record}'),
            'edit' => Pages\EditApplication::route('/{record}/edit'),
        ];
    }
}
