import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: {
    value: string;
    trend: 'up' | 'down';
  };
  icon: React.ElementType;
  className?: string;
}

export function AnalyticsCard({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  className
}: AnalyticsCardProps) {
  return (
    <Card className={cn("bg-[#F5F5F0]", className)}>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className="p-2 bg-primary/10 rounded-lg h-fit">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">{value}</p>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {change && (
              <div className="flex items-center gap-1 mt-1">
                <div className={cn(
                  "flex items-center text-sm",
                  change.trend === 'up' ? "text-green-600" : "text-red-600"
                )}>
                  {change.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {change.value}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
