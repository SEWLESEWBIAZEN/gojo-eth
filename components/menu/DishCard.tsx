import React from 'react'
import { Badge } from '../ui/Badge';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/Collapsible"
import { truncateText } from '@/lib/utils';
import DishImages from './DishImages';
import { Stars } from 'lucide-react';

interface DishProps {
    dish: {
        id: string;
        name: string;
        description?: string;
        image_url?: string;
        price?: number;
        spicy?: boolean;
        vegan?: boolean;
        featured?: boolean;
        rating?: number;
    }
}
const DishCard: React.FC<DishProps> = ({ dish }) => {
    return (
        <li className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.75rem)]">
            <Collapsible>
                <CollapsibleTrigger className="w-full">
                    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white/60 rounded-xl shadow-sm hover:shadow-lg hover:bg-white/80 transition-all duration-200 border border-orange-100">
                        {/* Dish Info */}
                        <div className="flex-1">
                            <p className="font-semibold text-orange-900 text-lg leading-tight">
                                {dish?.name}
                            </p>
                            {dish?.description && (
                                <p className="text-muted-foreground text-sm mt-1 leading-snug">
                                    {truncateText(dish?.description, 100)}
                                </p>
                            )}
                            {/* Badges */}
                            <div className="mt-2 flex flex-wrap gap-2">
                                {dish?.vegan && <Badge variant="secondary">Vegan</Badge>}
                                {dish?.spicy && <Badge variant="destructive">Spicy</Badge>}
                            </div>
                        </div>

                        {/* Price */}
                        {dish?.price && (
                            <p className="font-bold text-orange-700 text-lg sm:text-xl whitespace-nowrap">
                                ${dish?.price}
                            </p>
                        )}

                        {/* featured? */}
                        {dish?.featured && (
                            <Badge className="badge-featured bg-transparent absolute top-0 left-0">
                               <Stars className='text-primary shadow-glow'/> 
                            </Badge>
                        )}

                    </div>
                </CollapsibleTrigger>

                {/* Collapsible Content */}
                <CollapsibleContent className="mt-2 px-4 pb-3 text-sm text-gray-600 leading-relaxed">
                    <DishImages dish={dish} />
                </CollapsibleContent>
            </Collapsible>
        </li>

    )
}

export default DishCard
