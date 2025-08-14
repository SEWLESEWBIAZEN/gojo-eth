import React from 'react'
import { Badge } from '../ui/Badge';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/Collapsible"
import DishImages from './DishImages';
import { Star, Stars } from 'lucide-react';

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
        images?: string[];
        category_id:string;
    }

}
const DishCard: React.FC<DishProps> = ({ dish }) => {
    const [expandedOne, setExpandedOne] = React.useState("");
    return (
        <li className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(45.333%-0.75rem)]">
            <Collapsible open={expandedOne === dish?.id && dish?.images && dish?.images.length > 0} onOpenChange={(open) => { setExpandedOne(open ? dish?.id : "") }}>
                <CollapsibleTrigger className="w-full" onClick={() => setExpandedOne(dish?.id)}>
                    <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-3 p-4 bg-transparent  shadow-sm hover:shadow-lg  hover:border-x transition-all duration-200 border-y border-accent">
                        {/* Dish Info */}
                        <div className="flex-1">
                            <div className={`${dish?.featured && "mt-2"} flex justify-between items-start`}>
                            <p className="font-semibold text-orange-900 text-lg leading-tight text-left">
                                {dish?.name}
                            </p>
                            {/* Price */}
                            {dish?.price && (
                                <p className="font-bold text-orange-700 text-lg sm:text-xl whitespace-nowrap">
                                    ${dish?.price}
                                </p>
                            )}
                            </div>
                            {dish?.description && (
                                <p className="text-gray-800 text-sm mt-1 leading-snug text-justify">
                                    {dish?.description}
                                </p>
                            )}
                            {/* Badges */}
                            <div className="mt-2 flex flex-wrap gap-2">
                                {dish?.vegan && <Badge variant="secondary">Vegan</Badge>}
                                {dish?.spicy && <Badge variant="destructive">Spicy</Badge>}
                            </div>
                        </div>

                        {/* featured? */}
                        {dish?.featured && (
                            <Badge className="badge-featured bg-transparent absolute top-0 right-0 ">
                                <Star className='text-accent shadow-glow' />
                            </Badge>
                        )}
                    </div>
                </CollapsibleTrigger>
                {/* Collapsible Content */}
                <CollapsibleContent className="mt-2 px-4 pb-3 text-sm text-gray-600 leading-relaxed" >
                    <DishImages dish={dish} />
                </CollapsibleContent>
            </Collapsible>
        </li>

    )
}

export default DishCard
