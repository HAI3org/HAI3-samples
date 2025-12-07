import React, { useState } from 'react';
import { Checkbox, Switch, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Textarea } from '@hai3/uikit';
import { useTranslation, TextLoader } from '@hai3/uicore';
import { DEMO_SCREENSET_ID } from "../ids";
import { UI_KIT_ELEMENTS_SCREEN_ID } from "../ids";
import { FormInput } from '../uikit/icons/FormInput';
import { FormLabel } from '../uikit/icons/FormLabel';

/**
 * Form Elements Component
 * Contains Input, Select and Switch demonstrations
 * Uses parent screen (UIKitElementsScreen) translations
 */
export const FormElements: React.FC = () => {
  const { t } = useTranslation();
  
  // Helper function to access parent screen's translations
  const tk = (key: string) => t(`screen.${DEMO_SCREENSET_ID}.${UI_KIT_ELEMENTS_SCREEN_ID}:${key}`);
  
  const [airplaneMode, setAirplaneMode] = useState(false);

  return (
    <>
      {/* Checkbox Element Block */}
      <div data-element-id="element-checkbox" className="flex flex-col gap-4">
        <TextLoader skeletonClassName="h-8 w-28">
          <h2 className="text-2xl font-semibold">
            {tk('checkbox_heading')}
          </h2>
        </TextLoader>
        <div className="flex flex-col gap-6 p-6 border border-border rounded-lg bg-background overflow-hidden">
          {/* Basic Checkbox */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-24" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('checkbox_basic_label')}
              </label>
            </TextLoader>
            <div className="flex items-center gap-3">
              <Checkbox id="terms" />
              <FormLabel htmlFor="terms">{tk('checkbox_terms')}</FormLabel>
            </div>
          </div>

          {/* Checkbox with Description */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-32" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('checkbox_with_text_label')}
              </label>
            </TextLoader>
            <div className="flex items-start gap-3">
              <Checkbox id="terms-2" defaultChecked />
              <div className="grid gap-2">
                <FormLabel htmlFor="terms-2">{tk('checkbox_terms')}</FormLabel>
                <p className="text-muted-foreground text-sm">
                  {tk('checkbox_terms_description')}
                </p>
              </div>
            </div>
          </div>

          {/* Disabled Checkbox */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-24" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('checkbox_disabled_label')}
              </label>
            </TextLoader>
            <div className="flex items-start gap-3">
              <Checkbox id="toggle" disabled />
              <FormLabel htmlFor="toggle">{tk('checkbox_notifications')}</FormLabel>
            </div>
          </div>

          {/* Card Style Checkbox */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-24" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('checkbox_card_label')}
              </label>
            </TextLoader>
            <label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-primary/10 max-w-sm cursor-pointer">
              <Checkbox
                id="toggle-2"
                defaultChecked
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  {tk('checkbox_notifications')}
                </p>
                <p className="text-muted-foreground text-sm">
                  {tk('checkbox_notifications_description')}
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Input Element Block */}
      <div data-element-id="element-input" className="flex flex-col gap-4">
        <TextLoader skeletonClassName="h-8 w-24">
          <h2 className="text-2xl font-semibold">
            {tk('input_heading')}
          </h2>
        </TextLoader>
        <div className="flex flex-col gap-6 p-6 border border-border rounded-lg bg-background overflow-hidden">
          {/* Default Input */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-24" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('input_default_label')}
              </label>
            </TextLoader>
            <FormInput type="text" placeholder={tk('input_name_placeholder')} />
          </div>

          {/* File Input */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-24" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('input_file_label')}
              </label>
            </TextLoader>
            <FormInput id="picture" type="file" />
          </div>

          {/* Disabled Input */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-24" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('input_disabled_label')}
              </label>
            </TextLoader>
            <FormInput disabled type="email" placeholder={tk('input_email_placeholder')} />
          </div>

          {/* Input with Label */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-32" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('input_with_label_label')}
              </label>
            </TextLoader>
            <div className="grid w-full max-w-sm items-center gap-3">
              <FormLabel htmlFor="password-with-label">{tk('input_new_password_label')}</FormLabel>
              <FormInput type="password" id="password-with-label" placeholder={tk('input_password_placeholder')} />
            </div>
          </div>
        </div>
      </div>

      {/* Select Element Block */}
      <div data-element-id="element-select" className="flex flex-col gap-4">
        <TextLoader skeletonClassName="h-8 w-24">
          <h2 className="text-2xl font-semibold">
            {tk('select_heading')}
          </h2>
        </TextLoader>
        <div className="flex items-center justify-center p-6 border border-border rounded-lg bg-background overflow-hidden">
          <Select>
            <SelectTrigger className="w-[280px] max-w-full">
              <SelectValue placeholder={tk('select_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{tk('select_group_north_america')}</SelectLabel>
                <SelectItem value="est">{tk('timezone_est')}</SelectItem>
                <SelectItem value="cst">{tk('timezone_cst')}</SelectItem>
                <SelectItem value="mst">{tk('timezone_mst')}</SelectItem>
                <SelectItem value="pst">{tk('timezone_pst')}</SelectItem>
                <SelectItem value="akst">{tk('timezone_akst')}</SelectItem>
                <SelectItem value="hst">{tk('timezone_hst')}</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>{tk('select_group_europe_africa')}</SelectLabel>
                <SelectItem value="gmt">{tk('timezone_gmt')}</SelectItem>
                <SelectItem value="cet">{tk('timezone_cet')}</SelectItem>
                <SelectItem value="eet">{tk('timezone_eet')}</SelectItem>
                <SelectItem value="west">{tk('timezone_west')}</SelectItem>
                <SelectItem value="cat">{tk('timezone_cat')}</SelectItem>
                <SelectItem value="eat">{tk('timezone_eat')}</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>{tk('select_group_asia')}</SelectLabel>
                <SelectItem value="msk">{tk('timezone_msk')}</SelectItem>
                <SelectItem value="ist">{tk('timezone_ist')}</SelectItem>
                <SelectItem value="cst_china">{tk('timezone_cst_china')}</SelectItem>
                <SelectItem value="jst">{tk('timezone_jst')}</SelectItem>
                <SelectItem value="kst">{tk('timezone_kst')}</SelectItem>
                <SelectItem value="ist_indonesia">{tk('timezone_wita')}</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>{tk('select_group_australia_pacific')}</SelectLabel>
                <SelectItem value="awst">{tk('timezone_awst')}</SelectItem>
                <SelectItem value="acst">{tk('timezone_acst')}</SelectItem>
                <SelectItem value="aest">{tk('timezone_aest')}</SelectItem>
                <SelectItem value="nzst">{tk('timezone_nzst')}</SelectItem>
                <SelectItem value="fjt">{tk('timezone_fjt')}</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>{tk('select_group_south_america')}</SelectLabel>
                <SelectItem value="art">{tk('timezone_art')}</SelectItem>
                <SelectItem value="bot">{tk('timezone_bot')}</SelectItem>
                <SelectItem value="brt">{tk('timezone_brt')}</SelectItem>
                <SelectItem value="clt">{tk('timezone_clt')}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Switch Element Block */}
      <div data-element-id="element-switch" className="flex flex-col gap-4">
        <TextLoader skeletonClassName="h-8 w-24">
          <h2 className="text-2xl font-semibold">
            {tk('switch_heading')}
          </h2>
        </TextLoader>
        <div className="flex flex-col gap-2 p-6 border border-border rounded-lg bg-background">
          <div className="flex items-center justify-center gap-2">
            <TextLoader skeletonClassName="h-5 w-32" inheritColor>
              <label
                htmlFor="airplane-mode-switch"
                className="cursor-pointer select-none"
              >
                {tk('airplane_mode')}
              </label>
            </TextLoader>
            <Switch
              id="airplane-mode-switch"
              checked={airplaneMode}
              onCheckedChange={setAirplaneMode}
            />
          </div>
        </div>
      </div>

      {/* Textarea Element Block */}
      <div data-element-id="element-textarea" className="flex flex-col gap-4">
        <TextLoader skeletonClassName="h-8 w-24">
          <h2 className="text-2xl font-semibold">
            {tk('textarea_heading')}
          </h2>
        </TextLoader>
        <div className="flex flex-col gap-6 p-6 border border-border rounded-lg bg-background overflow-hidden">
          {/* Default Textarea */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-24" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('textarea_default_label')}
              </label>
            </TextLoader>
            <Textarea placeholder={tk('textarea_placeholder')} className="max-w-sm" />
          </div>

          {/* Disabled Textarea */}
          <div className="flex flex-col gap-2">
            <TextLoader skeletonClassName="h-4 w-24" inheritColor>
              <label className="text-xs text-muted-foreground">
                {tk('textarea_disabled_label')}
              </label>
            </TextLoader>
            <Textarea disabled placeholder={tk('textarea_placeholder')} className="max-w-sm" />
          </div>
        </div>
      </div>
    </>
  );
};

FormElements.displayName = 'FormElements';

