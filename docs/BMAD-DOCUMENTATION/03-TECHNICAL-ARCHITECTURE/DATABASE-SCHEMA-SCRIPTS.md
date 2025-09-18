# Database Schema Initialization Scripts
*SISO Unified Platform Database Setup*

## 🗄️ Initial Migration Script

### **supabase/migrations/20250101000000_initial_schema.sql**
```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Organizations table (Core entity for multi-tenancy)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('partner', 'client')) NOT NULL,
    subdomain VARCHAR(100) UNIQUE,
    logo_url TEXT,
    settings JSONB DEFAULT '{
        "theme": "dark",
        "timezone": "UTC",
        "notifications": {
            "email": true,
            "push": true,
            "desktop": true
        },
        "features": {
            "voice_channels": true,
            "file_sharing": true,
            "screen_sharing": false
        }
    }'::jsonb,
    subscription_tier VARCHAR(50) DEFAULT 'basic',
    max_members INTEGER DEFAULT 50,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (Partners and Clients)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    username VARCHAR(50) UNIQUE,
    avatar_url TEXT,
    role VARCHAR(50) CHECK (role IN ('admin', 'partner', 'client', 'moderator')) NOT NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    last_seen TIMESTAMP WITH TIME ZONE,
    timezone VARCHAR(50) DEFAULT 'UTC',
    preferences JSONB DEFAULT '{
        "theme": "dark",
        "notifications": {
            "mentions": true,
            "direct_messages": true,
            "channel_messages": false
        },
        "privacy": {
            "show_online_status": true,
            "allow_direct_messages": true
        }
    }'::jsonb,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Servers table (Discord-style communities)
CREATE TABLE servers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url TEXT,
    banner_url TEXT,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    owner_id UUID REFERENCES users(id),
    server_type VARCHAR(50) CHECK (server_type IN ('general', 'training', 'support', 'private', 'announcement')) DEFAULT 'general',
    is_public BOOLEAN DEFAULT FALSE,
    invite_code VARCHAR(20) UNIQUE,
    member_count INTEGER DEFAULT 0,
    settings JSONB DEFAULT '{
        "verification_level": "none",
        "explicit_content_filter": "all_members",
        "default_notifications": "all_messages",
        "features": {
            "welcome_screen": true,
            "member_verification": false,
            "preview_enabled": true
        }
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Server members (many-to-many relationship)
CREATE TABLE server_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    nickname VARCHAR(100),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    roles JSONB DEFAULT '[]'::jsonb,
    permissions JSONB DEFAULT '{}'::jsonb,
    UNIQUE(server_id, user_id)
);

-- Channels table (Within servers)
CREATE TABLE channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    channel_type VARCHAR(50) CHECK (channel_type IN ('text', 'voice', 'announcement', 'thread')) DEFAULT 'text',
    parent_id UUID REFERENCES channels(id), -- For categories and threads
    position INTEGER DEFAULT 0,
    is_private BOOLEAN DEFAULT FALSE,
    topic TEXT,
    rate_limit_per_user INTEGER DEFAULT 0, -- Slowmode in seconds
    permissions JSONB DEFAULT '{}'::jsonb,
    settings JSONB DEFAULT '{
        "history_visible": true,
        "auto_archive_duration": 1440
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table (Real-time messaging)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    content TEXT,
    message_type VARCHAR(50) DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'image', 'video', 'audio', 'system')),
    attachments JSONB DEFAULT '[]'::jsonb,
    embeds JSONB DEFAULT '[]'::jsonb,
    reactions JSONB DEFAULT '{}'::jsonb,
    mentions JSONB DEFAULT '[]'::jsonb,
    thread_id UUID REFERENCES messages(id), -- For threaded conversations
    reply_to_id UUID REFERENCES messages(id), -- For direct replies
    is_pinned BOOLEAN DEFAULT FALSE,
    is_edited BOOLEAN DEFAULT FALSE,
    edited_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure content exists for non-system messages
    CONSTRAINT content_required CHECK (
        message_type = 'system' OR 
        content IS NOT NULL OR 
        jsonb_array_length(attachments) > 0
    )
);

-- Partner-specific tables

-- Partner profiles (extends users for partners)
CREATE TABLE partner_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    commission_rate DECIMAL(5,2) DEFAULT 25.00, -- 25% default
    tier VARCHAR(50) DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum', 'diamond')),
    total_sales DECIMAL(12,2) DEFAULT 0,
    total_commissions DECIMAL(12,2) DEFAULT 0,
    clients_referred INTEGER DEFAULT 0,
    performance_score DECIMAL(5,2) DEFAULT 0,
    specializations JSONB DEFAULT '[]'::jsonb,
    certifications JSONB DEFAULT '[]'::jsonb,
    bio TEXT,
    website_url TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    availability JSONB DEFAULT '{
        "timezone": "UTC",
        "hours": {
            "monday": {"start": "09:00", "end": "17:00"},
            "tuesday": {"start": "09:00", "end": "17:00"},
            "wednesday": {"start": "09:00", "end": "17:00"},
            "thursday": {"start": "09:00", "end": "17:00"},
            "friday": {"start": "09:00", "end": "17:00"},
            "saturday": null,
            "sunday": null
        }
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Client projects (for client project tracking)
CREATE TABLE client_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    partner_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    project_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'discovery' CHECK (status IN ('discovery', 'proposal', 'active', 'completed', 'cancelled', 'on_hold')),
    priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    budget_range VARCHAR(50),
    timeline_weeks INTEGER,
    requirements JSONB DEFAULT '{}'::jsonb,
    deliverables JSONB DEFAULT '[]'::jsonb,
    progress_percentage INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    project_value DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Commission tracking
CREATE TABLE commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES users(id),
    project_id UUID REFERENCES client_projects(id),
    commission_type VARCHAR(50) CHECK (commission_type IN ('signup', 'monthly', 'project', 'referral', 'bonus')) NOT NULL,
    base_amount DECIMAL(12,2) NOT NULL,
    commission_rate DECIMAL(5,2) NOT NULL,
    commission_amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'disputed', 'cancelled')),
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    notes TEXT,
    due_date DATE,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gamification tables

-- Achievements system
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url TEXT,
    category VARCHAR(100),
    points INTEGER DEFAULT 0,
    requirements JSONB NOT NULL, -- Conditions to unlock
    badge_color VARCHAR(7), -- Hex color
    is_rare BOOLEAN DEFAULT FALSE,
    unlock_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements (unlocked achievements)
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress_data JSONB DEFAULT '{}'::jsonb,
    UNIQUE(user_id, achievement_id)
);

-- XP and leveling system
CREATE TABLE user_xp (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    total_xp INTEGER DEFAULT 0,
    current_level INTEGER DEFAULT 1,
    xp_to_next_level INTEGER DEFAULT 100,
    last_xp_gain TIMESTAMP WITH TIME ZONE,
    xp_history JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leaderboards
CREATE TABLE leaderboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    leaderboard_type VARCHAR(50) CHECK (leaderboard_type IN ('xp', 'sales', 'referrals', 'projects', 'custom')),
    time_period VARCHAR(50) CHECK (time_period IN ('daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'all_time')),
    organization_id UUID REFERENCES organizations(id),
    is_global BOOLEAN DEFAULT FALSE,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training and content tables

-- Training courses
CREATE TABLE training_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    category VARCHAR(100),
    difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    duration_minutes INTEGER,
    xp_reward INTEGER DEFAULT 0,
    prerequisites JSONB DEFAULT '[]'::jsonb,
    content_outline JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT FALSE,
    author_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User course progress
CREATE TABLE course_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES training_courses(id) ON DELETE CASCADE,
    progress_percentage INTEGER DEFAULT 0,
    completed_lessons JSONB DEFAULT '[]'::jsonb,
    time_spent_minutes INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- AI tools and business intelligence

-- Business audits (AI-generated)
CREATE TABLE business_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    partner_id UUID REFERENCES users(id),
    project_id UUID REFERENCES client_projects(id),
    audit_type VARCHAR(50) CHECK (audit_type IN ('initial', 'quarterly', 'annual', 'custom')),
    business_data JSONB NOT NULL,
    ai_analysis JSONB,
    recommendations JSONB DEFAULT '[]'::jsonb,
    priority_score DECIMAL(3,1), -- 1.0 to 10.0
    estimated_roi DECIMAL(8,2),
    confidence_score DECIMAL(3,2), -- 0.00 to 1.00
    status VARCHAR(50) DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- AI-generated pitches
CREATE TABLE ai_pitches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES users(id),
    business_audit_id UUID REFERENCES business_audits(id),
    pitch_type VARCHAR(50) CHECK (pitch_type IN ('initial', 'proposal', 'followup', 'custom')),
    target_audience VARCHAR(100),
    key_points JSONB DEFAULT '[]'::jsonb,
    generated_content TEXT,
    personalization_data JSONB DEFAULT '{}'::jsonb,
    effectiveness_score DECIMAL(3,2),
    usage_count INTEGER DEFAULT 0,
    last_used TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_servers_organization ON servers(organization_id);
CREATE INDEX idx_channels_server ON channels(server_id);
CREATE INDEX idx_messages_channel ON messages(channel_id);
CREATE INDEX idx_messages_user ON messages(user_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_server_members_server ON server_members(server_id);
CREATE INDEX idx_server_members_user ON server_members(user_id);
CREATE INDEX idx_commissions_partner ON commissions(partner_id);
CREATE INDEX idx_commissions_status ON commissions(status);
CREATE INDEX idx_client_projects_client ON client_projects(client_id);
CREATE INDEX idx_client_projects_partner ON client_projects(partner_id);
CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE server_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_xp ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_pitches ENABLE ROW LEVEL SECURITY;
```

## 🔐 Row Level Security Policies

### **supabase/migrations/20250101000001_rls_policies.sql**
```sql
-- Organizations: Users can only see their own organization
CREATE POLICY "Users can view own organization" ON organizations
    FOR SELECT USING (
        id = (SELECT organization_id FROM users WHERE id = auth.uid())
    );

CREATE POLICY "Admins can update own organization" ON organizations
    FOR UPDATE USING (
        id = (SELECT organization_id FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- Users: Can see users in same organization
CREATE POLICY "Users can view organization members" ON users
    FOR SELECT USING (
        organization_id = (SELECT organization_id FROM users WHERE id = auth.uid())
    );

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (id = auth.uid());

-- Servers: Can see servers in same organization
CREATE POLICY "Users can view organization servers" ON servers
    FOR SELECT USING (
        organization_id = (SELECT organization_id FROM users WHERE id = auth.uid())
    );

CREATE POLICY "Admins and partners can create servers" ON servers
    FOR INSERT WITH CHECK (
        organization_id = (
            SELECT organization_id FROM users 
            WHERE id = auth.uid() AND role IN ('admin', 'partner')
        )
    );

-- Server Members: Can see members of servers they belong to
CREATE POLICY "Users can view server members" ON server_members
    FOR SELECT USING (
        server_id IN (
            SELECT server_id FROM server_members WHERE user_id = auth.uid()
        )
    );

-- Channels: Can see channels in servers they're members of
CREATE POLICY "Users can view accessible channels" ON channels
    FOR SELECT USING (
        server_id IN (
            SELECT server_id FROM server_members WHERE user_id = auth.uid()
        )
        AND (
            is_private = FALSE OR
            id IN (
                SELECT channel_id FROM channel_permissions 
                WHERE user_id = auth.uid() AND can_view = TRUE
            )
        )
    );

-- Messages: Can see messages in accessible channels
CREATE POLICY "Users can view channel messages" ON messages
    FOR SELECT USING (
        channel_id IN (
            SELECT c.id FROM channels c
            JOIN server_members sm ON c.server_id = sm.server_id
            WHERE sm.user_id = auth.uid()
            AND (c.is_private = FALSE OR EXISTS (
                SELECT 1 FROM channel_permissions cp 
                WHERE cp.channel_id = c.id AND cp.user_id = auth.uid() AND cp.can_view = TRUE
            ))
        )
        AND deleted_at IS NULL
    );

CREATE POLICY "Users can send messages to accessible channels" ON messages
    FOR INSERT WITH CHECK (
        user_id = auth.uid()
        AND channel_id IN (
            SELECT c.id FROM channels c
            JOIN server_members sm ON c.server_id = sm.server_id
            WHERE sm.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can edit own messages" ON messages
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own messages" ON messages
    FOR DELETE USING (user_id = auth.uid());

-- Partner Profiles: Partners can view/edit own profile, others can view
CREATE POLICY "Users can view partner profiles" ON partner_profiles
    FOR SELECT USING (
        user_id IN (
            SELECT id FROM users 
            WHERE organization_id = (
                SELECT organization_id FROM users WHERE id = auth.uid()
            )
        )
    );

CREATE POLICY "Partners can update own profile" ON partner_profiles
    FOR UPDATE USING (user_id = auth.uid());

-- Client Projects: Clients see own projects, partners see assigned projects
CREATE POLICY "Users can view relevant projects" ON client_projects
    FOR SELECT USING (
        client_id = auth.uid() OR 
        partner_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
            AND organization_id = client_projects.organization_id
        )
    );

CREATE POLICY "Clients can create projects" ON client_projects
    FOR INSERT WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients and assigned partners can update projects" ON client_projects
    FOR UPDATE USING (client_id = auth.uid() OR partner_id = auth.uid());

-- Commissions: Partners see own commissions, admins see all
CREATE POLICY "Users can view relevant commissions" ON commissions
    FOR SELECT USING (
        partner_id = auth.uid() OR
        client_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
            AND organization_id = (
                SELECT organization_id FROM users WHERE id = commissions.partner_id
            )
        )
    );

-- Achievements: All users can view achievements
CREATE POLICY "Users can view achievements" ON achievements
    FOR SELECT USING (true);

-- User Achievements: Users can view own achievements, others can view public ones
CREATE POLICY "Users can view user achievements" ON user_achievements
    FOR SELECT USING (
        user_id = auth.uid() OR
        user_id IN (
            SELECT id FROM users 
            WHERE organization_id = (
                SELECT organization_id FROM users WHERE id = auth.uid()
            )
        )
    );

-- XP: Users can view own XP, others can view public XP
CREATE POLICY "Users can view user XP" ON user_xp
    FOR SELECT USING (
        user_id = auth.uid() OR
        user_id IN (
            SELECT id FROM users 
            WHERE organization_id = (
                SELECT organization_id FROM users WHERE id = auth.uid()
            )
        )
    );

CREATE POLICY "Users can update own XP" ON user_xp
    FOR UPDATE USING (user_id = auth.uid());

-- Training Courses: Organization members can view courses
CREATE POLICY "Users can view organization courses" ON training_courses
    FOR SELECT USING (
        is_published = TRUE AND (
            organization_id IS NULL OR
            organization_id = (
                SELECT organization_id FROM users WHERE id = auth.uid()
            )
        )
    );

-- Course Progress: Users can view/update own progress
CREATE POLICY "Users can view own course progress" ON course_progress
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own course progress" ON course_progress
    FOR ALL USING (user_id = auth.uid());

-- Business Audits: Clients and assigned partners can view
CREATE POLICY "Users can view relevant audits" ON business_audits
    FOR SELECT USING (
        client_id = auth.uid() OR 
        partner_id = auth.uid()
    );

-- AI Pitches: Partners can view own pitches
CREATE POLICY "Partners can view own pitches" ON ai_pitches
    FOR SELECT USING (partner_id = auth.uid());

CREATE POLICY "Partners can manage own pitches" ON ai_pitches
    FOR ALL USING (partner_id = auth.uid());
```

## 🎯 Database Functions

### **supabase/migrations/20250101000002_functions.sql**
```sql
-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_organizations_updated_at
    BEFORE UPDATE ON organizations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_servers_updated_at
    BEFORE UPDATE ON servers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_channels_updated_at
    BEFORE UPDATE ON channels
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Function to calculate user level from XP
CREATE OR REPLACE FUNCTION calculate_level_from_xp(total_xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
    -- Level formula: sqrt(total_xp / 100)
    RETURN GREATEST(1, FLOOR(SQRT(total_xp / 100.0))::INTEGER);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to calculate XP needed for next level
CREATE OR REPLACE FUNCTION calculate_xp_for_next_level(current_level INTEGER)
RETURNS INTEGER AS $$
BEGIN
    -- XP needed = (level + 1)^2 * 100
    RETURN POWER(current_level + 1, 2) * 100;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to award XP to user
CREATE OR REPLACE FUNCTION award_xp(user_uuid UUID, xp_amount INTEGER, source TEXT DEFAULT 'manual')
RETURNS VOID AS $$
DECLARE
    current_xp INTEGER;
    new_total_xp INTEGER;
    new_level INTEGER;
    old_level INTEGER;
BEGIN
    -- Get current XP or create record
    INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level)
    VALUES (user_uuid, 0, 1, 100)
    ON CONFLICT (user_id) DO NOTHING;
    
    -- Get current values
    SELECT total_xp, current_level INTO current_xp, old_level
    FROM user_xp WHERE user_id = user_uuid;
    
    -- Calculate new values
    new_total_xp := current_xp + xp_amount;
    new_level := calculate_level_from_xp(new_total_xp);
    
    -- Update user XP
    UPDATE user_xp SET
        total_xp = new_total_xp,
        current_level = new_level,
        xp_to_next_level = calculate_xp_for_next_level(new_level) - new_total_xp,
        last_xp_gain = NOW(),
        xp_history = xp_history || jsonb_build_object(
            'amount', xp_amount,
            'source', source,
            'timestamp', NOW(),
            'level_before', old_level,
            'level_after', new_level
        ),
        updated_at = NOW()
    WHERE user_id = user_uuid;
    
    -- If leveled up, could trigger achievement check here
    IF new_level > old_level THEN
        -- Could call achievement checking function
        PERFORM check_level_achievements(user_uuid, new_level);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to check and award achievements
CREATE OR REPLACE FUNCTION check_level_achievements(user_uuid UUID, new_level INTEGER)
RETURNS VOID AS $$
DECLARE
    achievement_record RECORD;
BEGIN
    -- Check for level-based achievements
    FOR achievement_record IN 
        SELECT id, requirements 
        FROM achievements 
        WHERE requirements->>'type' = 'level'
        AND (requirements->>'level')::INTEGER <= new_level
    LOOP
        -- Award achievement if not already earned
        INSERT INTO user_achievements (user_id, achievement_id)
        VALUES (user_uuid, achievement_record.id)
        ON CONFLICT (user_id, achievement_id) DO NOTHING;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to update server member count
CREATE OR REPLACE FUNCTION update_server_member_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE servers 
        SET member_count = member_count + 1 
        WHERE id = NEW.server_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE servers 
        SET member_count = member_count - 1 
        WHERE id = OLD.server_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update server member count
CREATE TRIGGER update_server_member_count_trigger
    AFTER INSERT OR DELETE ON server_members
    FOR EACH ROW
    EXECUTE FUNCTION update_server_member_count();

-- Function to generate invite codes
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result TEXT := '';
    i INTEGER;
BEGIN
    FOR i IN 1..8 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to create default channels for new servers
CREATE OR REPLACE FUNCTION create_default_channels()
RETURNS TRIGGER AS $$
BEGIN
    -- Create general text channel
    INSERT INTO channels (server_id, name, description, channel_type, position)
    VALUES (NEW.id, 'general', 'General discussion', 'text', 0);
    
    -- Create announcements channel
    INSERT INTO channels (server_id, name, description, channel_type, position)
    VALUES (NEW.id, 'announcements', 'Important announcements', 'announcement', 1);
    
    -- Add server owner as first member
    INSERT INTO server_members (server_id, user_id, roles)
    VALUES (NEW.id, NEW.owner_id, '["owner", "admin"]'::jsonb);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create default channels when server is created
CREATE TRIGGER create_default_channels_trigger
    AFTER INSERT ON servers
    FOR EACH ROW
    EXECUTE FUNCTION create_default_channels();
```

## 🌱 Seed Data Script

### **supabase/seed.sql**
```sql
-- Insert sample achievements
INSERT INTO achievements (name, description, icon_url, category, points, requirements, badge_color) VALUES
('First Steps', 'Complete your profile setup', '/icons/first-steps.svg', 'onboarding', 50, '{"type": "profile_complete"}', '#10b981'),
('Early Bird', 'Join your first server', '/icons/early-bird.svg', 'community', 25, '{"type": "server_join", "count": 1}', '#3b82f6'),
('Conversationalist', 'Send 100 messages', '/icons/chat.svg', 'engagement', 100, '{"type": "messages_sent", "count": 100}', '#8b5cf6'),
('Level Up!', 'Reach level 5', '/icons/level-up.svg', 'progression', 200, '{"type": "level", "level": 5}', '#f59e0b'),
('Sales Starter', 'Make your first sale', '/icons/sales.svg', 'business', 500, '{"type": "sales", "count": 1}', '#ef4444'),
('Team Player', 'Help 5 clients', '/icons/team.svg', 'business', 300, '{"type": "clients_helped", "count": 5}', '#06b6d4'),
('Knowledge Seeker', 'Complete 3 training courses', '/icons/education.svg', 'learning', 250, '{"type": "courses_completed", "count": 3}', '#84cc16'),
('Mentor', 'Refer 10 new partners', '/icons/mentor.svg', 'community', 1000, '{"type": "referrals", "count": 10}', '#a855f7'),
('High Achiever', 'Earn $10,000 in commissions', '/icons/trophy.svg', 'business', 2000, '{"type": "commissions", "amount": 10000}', '#dc2626'),
('Community Builder', 'Create a server with 50+ members', '/icons/community.svg', 'leadership', 1500, '{"type": "server_size", "members": 50}', '#059669');

-- Insert sample training courses
INSERT INTO training_courses (title, description, category, difficulty_level, duration_minutes, xp_reward, is_published, content_outline) VALUES
('SISO Platform Basics', 'Learn the fundamentals of using the SISO platform effectively', 'Platform', 'beginner', 45, 100, true, 
'[
    {"title": "Platform Overview", "duration": 10},
    {"title": "Navigation Basics", "duration": 15},
    {"title": "Communication Tools", "duration": 20}
]'::jsonb),

('Sales Psychology Fundamentals', 'Understanding client psychology for better sales outcomes', 'Sales', 'intermediate', 90, 200, true,
'[
    {"title": "Understanding Client Needs", "duration": 30},
    {"title": "Building Trust and Rapport", "duration": 30},
    {"title": "Overcoming Objections", "duration": 30}
]'::jsonb),

('Business Restructuring 101', 'Learn how to analyze and restructure businesses for 10x growth', 'Business', 'advanced', 120, 300, true,
'[
    {"title": "Business Analysis Framework", "duration": 40},
    {"title": "Identifying Growth Opportunities", "duration": 40},
    {"title": "Implementation Strategies", "duration": 40}
]'::jsonb),

('AI Tools Mastery', 'Master the AI tools integrated into the SISO platform', 'Technology', 'intermediate', 75, 150, true,
'[
    {"title": "Business Audit AI", "duration": 25},
    {"title": "Pitch Generator", "duration": 25},
    {"title": "ROI Calculator", "duration": 25}
]'::jsonb);

-- Insert sample leaderboards
INSERT INTO leaderboards (name, description, leaderboard_type, time_period, is_global) VALUES
('Top Performers - Monthly', 'Monthly sales leaders across all organizations', 'sales', 'monthly', true),
('XP Champions - Weekly', 'Weekly XP earnings leaderboard', 'xp', 'weekly', true),
('Referral Kings - All Time', 'All-time referral leaders', 'referrals', 'all_time', true),
('Active Contributors - Daily', 'Daily engagement and contribution scores', 'custom', 'daily', true);
```

---

*Database Foundation: Scalable schema + security policies + performance optimization = enterprise-ready platform*