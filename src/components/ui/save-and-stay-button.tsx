import { Save } from 'lucide-react';
import { Button } from './button';

export const SaveAndStayButton = (props: React.ComponentProps<'button'>) => {
  return (
    <Button
      variant="secondary"
      size="default"
      type="submit"
      name="save-and-stay"
      {...props}
    >
      <Save /> Save and Stay
    </Button>
  );
};
