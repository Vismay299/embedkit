// Widget types
export type WidgetCategory = 'counters' | 'buttons' | 'weather' | 'productivity' | 'business';

export type WidgetPlan = 'free' | 'basic' | 'pro' | 'ultimate';

export interface WidgetDefinition {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: WidgetCategory;
  icon: string;
  previewUrl: string;
  isNew?: boolean;
  isComingSoon?: boolean;
  isPartner?: boolean;
  requiredPlan: WidgetPlan;
  configSchema: WidgetConfigField[];
}

export interface WidgetConfigField {
  key: string;
  label: string;
  type: 'text' | 'color' | 'number' | 'select' | 'toggle';
  default: string | number | boolean;
  options?: { label: string; value: string }[];
}

export interface UserWidget {
  id: string;
  userId: string;
  widgetId: string;
  name: string;
  config: Record<string, string | number | boolean>;
  embedToken: string;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  widget?: WidgetDefinition;
}

// Pricing types
export type PricingTier = 'free' | 'basic' | 'pro' | 'ultimate';

export interface PricingPlan {
  tier: PricingTier;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  widgets: number;
  apps: number;
  viewsPerMonth: number;
  embedOnWebsite: boolean;
  removeBranding: boolean;
  betaFeatures: boolean;
  support: string;
  highlighted?: boolean;
  widgetTypes: number;
  features: string[];
}

export interface PricingFeature {
  name: string;
  key: string;
  values: Record<PricingTier, string | boolean>;
  isHeader?: boolean;
}

// Blog types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
}

// PageVault types
export interface PageVault {
  id: string;
  userId: string;
  notionUrl: string;
  title: string;
  accessType: 'email_gate' | 'payment';
  price?: number;
  createdAt: string;
}

// User profile
export interface UserProfile {
  id: string;
  userId: string;
  fullName: string;
  avatarUrl?: string;
  planTier: PricingTier;
  createdAt: string;
}
