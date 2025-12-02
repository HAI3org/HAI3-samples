import React from 'react';
import { Avatar, AvatarImage, AvatarFallback, Badge } from '@hai3/uikit';
import { useTranslation, TextLoader } from '@hai3/uicore';
import { BadgeCheckIcon } from '../uikit/icons/BadgeCheckIcon';
import { DEMO_SCREENSET_ID } from "../ids";
import { UI_KIT_ELEMENTS_SCREEN_ID } from "../ids";

/**
 * Data Display Elements Component
 * Contains Avatar and Badge demonstrations
 * Uses parent screen (UIKitElementsScreen) translations
 */
export const DataDisplayElements: React.FC = () => {
  const { t } = useTranslation();
  
  // Helper function to access parent screen's translations
  const tk = (key: string) => t(`screen.${DEMO_SCREENSET_ID}.${UI_KIT_ELEMENTS_SCREEN_ID}:${key}`);

  return (
    <>
      {/* Avatar Element Block */}
      <div data-element-id="element-avatar" className="flex flex-col gap-4">
        <TextLoader skeletonClassName="h-8 w-24">
          <h2 className="text-2xl font-semibold">
            {tk('avatar_heading')}
          </h2>
        </TextLoader>
        <div className="flex items-center justify-center p-6 border border-border rounded-lg bg-background">
          <div className="flex flex-row flex-wrap items-center gap-12">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="rounded-lg">
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Element Block */}
      <div data-element-id="element-badge" className="flex flex-col gap-4">
        <TextLoader skeletonClassName="h-8 w-24">
          <h2 className="text-2xl font-semibold">
            {tk('badge_heading')}
          </h2>
        </TextLoader>
        <div className="flex items-center justify-center p-6 border border-border rounded-lg bg-background overflow-hidden">
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex w-full flex-wrap gap-2 justify-center">
              <Badge>
                <TextLoader skeletonClassName="h-4 w-12" inheritColor>
                  {tk('badge_default')}
                </TextLoader>
              </Badge>
              <Badge variant="secondary">
                <TextLoader skeletonClassName="h-3.5 w-14" inheritColor>
                  {tk('badge_secondary')}
                </TextLoader>
              </Badge>
              <Badge variant="destructive">
                <TextLoader skeletonClassName="h-4 w-20" inheritColor>
                  {tk('badge_destructive')}
                </TextLoader>
              </Badge>
              <Badge variant="outline">
                <TextLoader skeletonClassName="h-3.5 w-14" inheritColor>
                  {tk('badge_outline')}
                </TextLoader>
              </Badge>
            </div>
            <div className="flex w-full flex-wrap gap-2 justify-center">
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600"
              >
                <BadgeCheckIcon className="w-3 h-3" />
                <TextLoader skeletonClassName="h-3.5 w-10" inheritColor>
                  {tk('badge_verified')}
                </TextLoader>
              </Badge>
              <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                8
              </Badge>
              <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-green-500 text-white"
              >
                99
              </Badge>
              <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                variant="destructive"
              >
                99
              </Badge>
              <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                variant="outline"
              >
                20+
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DataDisplayElements.displayName = 'DataDisplayElements';

