import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@hai3/uikit';
import { ButtonVariant } from '@hai3/uikit-contracts';

// Form validation schema
const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export interface ProfileFormProps {
  /** Translation function */
  tk: (key: string) => string;
  /** Callback when form is submitted with valid data */
  onSubmit?: (values: ProfileFormValues) => void;
}

/**
 * Profile Form Demo Component
 * Demonstrates Form component usage with zod validation
 */
export function ProfileForm({ tk, onSubmit }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
    },
  });

  function handleSubmit(values: ProfileFormValues) {
    if (onSubmit) {
      onSubmit(values);
    } else {
      // Default behavior for demo
      console.log("Form submitted:", values);
      alert(`Form submitted with username: ${values.username}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-sm">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tk('form_username_label')}</FormLabel>
              <FormControl>
                <Input placeholder={tk('form_username_placeholder')} {...field} />
              </FormControl>
              <FormDescription>
                {tk('form_username_description')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={ButtonVariant.Default}>
          {tk('form_submit_button')}
        </Button>
      </form>
    </Form>
  );
}
