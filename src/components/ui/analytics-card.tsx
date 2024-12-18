import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsCardProps {
  title: string;
  value: string;
  description?: string;
  change?: string | number;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  className?: string;
}

export function AnalyticsCard({
  title,
  value,
  description,
  change,
  trend,
  icon: Icon,
  className,
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
              {change && (
                <span className={cn(
                  "text-sm flex items-center",
                  trend === 'up' && "text-green-600",
                  trend === 'down' && "text-red-600",
                  trend === 'neutral' && "text-gray-600"
                )}>
                  {trend === 'up' && <TrendingUp className="h-4 w-4 mr-1" />}
                  {trend === 'down' && <TrendingDown className="h-4 w-4 mr-1" />}
                  {change}
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
