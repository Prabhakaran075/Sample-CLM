import React, { useState } from 'react';
import type { AutomationRecipe } from '../types';
import RecipeCard from '../components/automations/RecipeCard';
import type { Page } from '../App';

const mockRecipesData: AutomationRecipe[] = [
  {
    id: 'rec-001',
    title: 'Auto-send for Review on Upload',
    description: 'When a new contract is uploaded in "Draft", automatically start the standard Legal -> Finance approval workflow.',
    trigger: 'On contract upload',
    author: 'Simple CLM',
    isEnabled: true,
  },
  {
    id: 'rec-002',
    title: 'Auto-renew 30 Days Before Expiry',
    description: 'For contracts marked as "Auto-Renewable", automatically create a new draft for renewal 30 days before the expiry date.',
    trigger: 'Scheduled daily check',
    author: 'Simple CLM',
    isEnabled: false,
  },
  {
    id: 'rec-003',
    title: 'Notify Stakeholders on Signature',
    description: 'When a contract is successfully signed by all parties, send an email notification to the relevant business stakeholders.',
    trigger: 'On contract signed',
    author: 'Community',
    isEnabled: true,
  },
  {
    id: 'rec-004',
    title: 'Auto-archive After 1 Year',
    description: 'One year after a contract expires, automatically move it from the active repository to the long-term archive.',
    trigger: 'Scheduled daily check',
    author: 'Simple CLM',
    isEnabled: false,
  },
];

interface AutomationHubPageProps {
    setCurrentPage: (page: Page) => void;
}

const AutomationHubPage: React.FC<AutomationHubPageProps> = ({ setCurrentPage }) => {
  const [recipes, setRecipes] = useState<AutomationRecipe[]>(mockRecipesData);

  const handleToggleRecipe = (recipeId: string) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === recipeId ? { ...recipe, isEnabled: !recipe.isEnabled } : recipe
      )
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Automation Hub</h2>
        <p className="text-gray-500 mt-1">
          Enable pre-built recipes to automate your contract lifecycle and reduce manual work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} onToggle={handleToggleRecipe} />
        ))}
      </div>
       <div className="mt-10 text-center">
            <button 
              onClick={() => setCurrentPage('create-recipe')}
              className="bg-primary-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-primary-700">
                Create Custom Recipe
            </button>
        </div>
    </div>
  );
};

export default AutomationHubPage;