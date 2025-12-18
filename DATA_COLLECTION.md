# 📊 Anonymous Data Collection Feature

## Overview

Users can now track their digital well-being progress over time **completely anonymously** without creating accounts!

## How It Works

### 🔐 Privacy-First Design

1. **Anonymous User ID**: When a user takes their first assessment, a unique anonymous ID is generated (e.g., `anon_1734456789_xyz123`)
2. **Local Storage**: This ID is stored only in the user's browser localStorage
3. **No Personal Data**: No emails, names, or personally identifiable information is collected
4. **User Control**: Users can delete all their data at any time

### 💾 What Gets Saved

Each assessment stores:
- Input data (age, gender, screen time, etc.)
- Prediction result (At Risk / Moderate / Balanced)
- Confidence scores for each category
- Timestamp

### 🚀 New Features

#### 1. **History Page** (`/history`)
- View all past assessments
- See overall statistics
- Track trends over time (improving/declining/stable)
- Category breakdown (how many At Risk vs Moderate vs Balanced)
- Delete all history

#### 2. **Progress Tracking**
- Total assessments count
- Latest prediction
- Trend indicator (📈 improving / 📉 declining / ➡️ stable)
- Visual progress bars

#### 3. **Data Management**
- One-click history deletion
- GDPR compliant
- No account needed

## API Endpoints

### Save Assessment
```
POST /api/v1/history/save?user_id={anonymous_id}
Body: {
  "input_data": {...},
  "prediction": {...}
}
```

### Get User History
```
GET /api/v1/history/user/{user_id}
Returns: List of all assessments
```

### Get Statistics
```
GET /api/v1/history/stats/{user_id}
Returns: Aggregated stats and trends
```

### Delete History
```
DELETE /api/v1/history/user/{user_id}
Deletes: All user data permanently
```

## Technical Stack

### Backend
- **Database**: SQLite (file-based, no setup needed)
- **ORM**: SQLAlchemy 2.0
- **API**: FastAPI with new `/api/v1/history` routes

### Frontend
- **Storage**: localStorage for anonymous ID
- **State**: React hooks
- **Routing**: New `/history` page

## Database Schema

```sql
CREATE TABLE assessments (
    id INTEGER PRIMARY KEY,
    user_id TEXT,  -- Anonymous ID
    
    -- Input fields
    age INTEGER,
    gender TEXT,
    daily_screen_time_hrs REAL,
    primary_platform TEXT,
    sleep_quality INTEGER,
    stress_level INTEGER,
    days_without_social_media INTEGER,
    exercise_frequency_week INTEGER,
    
    -- Results
    prediction TEXT,
    confidence_at_risk REAL,
    confidence_moderate REAL,
    confidence_balanced REAL,
    
    created_at DATETIME DEFAULT NOW()
);
```

## File Structure

### Backend
```
backend/
├── app/
│   ├── database.py              # NEW: SQLAlchemy setup
│   ├── main.py                  # Updated: DB init + history router
│   ├── api/
│   │   └── history.py           # NEW: History endpoints
│   └── models/
│       └── database_models.py   # NEW: Assessment model
```

### Frontend
```
frontend/
├── app/
│   └── history/
│       └── page.tsx             # NEW: History page
├── lib/
│   ├── userId.ts                # NEW: Anonymous ID management
│   └── api.ts                   # Updated: History methods
```

## Privacy & Security

✅ **What we DON'T collect:**
- Email addresses
- IP addresses
- Passwords
- Personal identifying information

✅ **What users control:**
- When to save assessments
- View their history anytime
- Delete all data instantly

✅ **GDPR Compliance:**
- Right to be forgotten (delete endpoint)
- Data portability (can export via browser)
- Minimal data collection

## Usage Example

```typescript
// User takes assessment
const userId = getAnonymousUserId(); // e.g., "anon_1734456789_xyz"
const result = await api.predict(formData);

// Save to database
await api.saveAssessment(userId, formData, result);

// Later, view history
const history = await api.getUserHistory(userId);
// Returns all past assessments

// Get statistics
const stats = await api.getUserStats(userId);
// Returns: { total: 5, trend: "improving", ... }

// Delete everything
await api.deleteUserHistory(userId);
clearAnonymousUserId();
```

## Benefits

1. **User Engagement**: Track progress motivates continued use
2. **Insights**: See patterns over time
3. **Privacy**: No accounts, no emails, no tracking
4. **Simple**: Works out of the box with SQLite
5. **Portable**: Easy to migrate to PostgreSQL later

## Future Enhancements

Potential additions:
- 📈 Charts/graphs of trends over time
- 📥 Export data as CSV/PDF
- 📊 Compare with anonymized aggregate data
- 🎯 Set goals and track progress
- 📅 Weekly/monthly summary emails (opt-in)

---

**Note**: The database file `digital_wellbeing.db` is created automatically in the `backend/` directory when the first assessment is saved.
