import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ElementType;
  description?: string;
}

export function AnalyticsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description
}: AnalyticsCardProps) {
  return (
    <Card className="!bg-[#F5F5F0]">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className="p-2 bg-red-500 rounded-lg h-fit">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {(change || description) && (
              <div className="flex items-center gap-2 mt-1">
                {change && (
                  <div className={cn(
                    "flex items-center text-sm",
                    trend === 'up' ? "text-green-600" : "text-red-600"
                  )}>
                    {trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {change}
                  </div>
                )}
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
