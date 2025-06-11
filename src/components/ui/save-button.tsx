import { Save } from 'lucide-react';
import { Button } from './button';

export const SaveButton = (props: React.ComponentProps<'button'>) => {
  return (
    <Button
      variant="default"
      size="default"
      type="submit"
      name="save"
      {...props}
    >
      <Save /> Save
    </Button>
  );
};
