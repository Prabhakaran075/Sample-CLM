import React from 'react';
import type { AutomationRecipe } from '../../types';
import { BoltIcon } from '../icons/IconComponents';

interface RecipeCardProps {
    recipe: AutomationRecipe;
    onToggle: (id: string) => void;
}

const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: () => void }> = ({ enabled, onToggle }) => (
  <button
    type="button"
    className={`${
      enabled ? 'bg-primary-600' : 'bg-gray-200'
    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
    role="switch"
    aria-checked={enabled}
    onClick={onToggle}
  >
    <span
      aria-hidden="true"
      className={`${
        enabled ? 'translate-x-5' : 'translate-x-0'
      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
    />
  </button>
);


const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onToggle }) => {
    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col">
            <div className="p-6 flex-grow">
                 <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                        <BoltIcon className="w-6 h-6 text-primary-600" />
                    </div>
                    <ToggleSwitch enabled={recipe.isEnabled} onToggle={() => onToggle(recipe.id)} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{recipe.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-grow">{recipe.description}</p>
            </div>
             <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between items-center text-xs text-gray-500">
                <span>Trigger: <span className="font-semibold">{recipe.trigger}</span></span>
                <span>By: <span className="font-semibold">{recipe.author}</span></span>
            </div>
        </div>
    );
};

export default RecipeCard;