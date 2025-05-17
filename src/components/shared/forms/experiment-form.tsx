import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormFieldRepeater,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SaveButton } from '@/components/ui/save-button';
import { Combobox } from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';

const tools = [
  {
    label: 'Caliper',
    value: 'C1',
  },
  {
    label: 'Caliper',
    value: 'C2',
  },
  {
    label: 'Caliper',
    value: 'C3',
  },
  {
    label: 'Caliper',
    value: 'C4',
  },
  {
    label: 'Caliper',
    value: 'C5',
  },
  {
    label: 'Caliper',
    value: 'C6',
  },
  {
    label: 'Caliper',
    value: 'C7',
  },
  {
    label: 'Caliper',
    value: 'C8',
  },
  {
    label: 'Caliper',
    value: 'C9',
  },
  {
    label: 'Caliper',
    value: 'C10',
  },
  {
    label: 'Caliper',
    value: 'C11',
  },
  {
    label: 'Caliper',
    value: 'C12',
  },
  {
    label: 'Caliper',
    value: 'C13',
  },
  {
    label: 'Caliper',
    value: 'C14',
  },
  {
    label: 'Caliper',
    value: 'C15',
  },
  {
    label: 'Caliper',
    value: 'C16',
  },
  {
    label: 'Caliper',
    value: 'C17',
  },
  {
    label: 'Caliper',
    value: 'C18',
  },
  {
    label: 'Caliper',
    value: 'C19',
  },
  {
    label: 'Caliper',
    value: 'C20',
  },
  {
    label: 'Caliper',
    value: 'C21',
  },
  {
    label: 'Micrometer',
    value: 'M1',
  },
  {
    label: 'Micrometer',
    value: 'M2',
  },
  {
    label: 'Micrometer',
    value: 'M3',
  },
  {
    label: 'Micrometer',
    value: 'M4',
  },
  {
    label: 'Micrometer',
    value: 'M5',
  },
  {
    label: 'Micrometer',
    value: 'M6',
  },
  {
    label: 'Micrometer',
    value: 'M7',
  },
  {
    label: 'Micrometer',
    value: 'M8',
  },
  {
    label: 'Micrometer',
    value: 'M9',
  },
  {
    label: 'Micrometer',
    value: 'M10',
  },
  {
    label: 'Micrometer',
    value: 'M11',
  },
  {
    label: 'Micrometer',
    value: 'M12',
  },
  {
    label: 'Micrometer',
    value: 'M13',
  },
  {
    label: 'Micrometer',
    value: 'M14',
  },
  {
    label: 'micrometer',
    value: 'M15',
  },
  {
    label: 'Micrometer',
    value: 'M16',
  },
  {
    label: 'Micrometer',
    value: 'M17',
  },
  {
    label: 'Micrometer',
    value: 'M18',
  },
  {
    label: 'Micrometer',
    value: 'M19',
  },
  {
    label: 'Micrometer',
    value: 'M20',
  },
  {
    label: ' i Micrometer',
    value: 'iM1',
  },
  {
    label: ' i Micrometer',
    value: 'iM2',
  },
  {
    label: ' i Micrometer',
    value: 'iM3',
  },
  {
    label: ' i Micrometer',
    value: 'iM4',
  },
  {
    label: ' i Micrometer',
    value: 'iM5',
  },
  {
    label: ' i Micrometer',
    value: 'iM6',
  },
  {
    label: ' i Micrometer',
    value: 'iM7',
  },
  {
    label: ' i Micrometer',
    value: 'iM8',
  },
  {
    label: ' i Micrometer',
    value: 'iM9',
  },
  {
    label: ' i Micrometer',
    value: 'iM10',
  },
  {
    label: ' i Micrometer',
    value: 'iM11',
  },
  {
    label: 'dm1',
    value: 'dm1',
  },
  {
    label: 'dm2',
    value: 'dm2',
  },
  {
    label: 'sheet matle micrometer',
    value: 'smm1',
  },
  {
    label: 'sheet matle micrometer',
    value: 'smm2',
  },
  {
    label: 'sheet matle micrometer',
    value: 'smm3',
  },
  {
    label: 'sheet matle micrometer',
    value: 'smm4',
  },
  {
    label: 'Gear caliper',
    value: 'GC1',
  },
  {
    label: 'Gear caliper',
    value: 'GC2',
  },
  {
    label: 'Gear caliper',
    value: 'GC3',
  },
  {
    label: 'Gear caliper',
    value: 'GC4',
  },
  {
    label: 'Gear caliper',
    value: 'GC5',
  },
  {
    label: 'Bore gange',
    value: 'BG1',
  },
  {
    label: 'Bore gange',
    value: 'BG2',
  },
  {
    label: 'Bore gange',
    value: 'BG3',
  },
  {
    label: 'Bore gange',
    value: 'BG4',
  },
  {
    label: 'Bore gange',
    value: 'BG5',
  },
  {
    label: 'Bore gange',
    value: 'BG6',
  },
  {
    label: 'Bore gange',
    value: 'BG7',
  },
  {
    label: 'Bore gange',
    value: 'BG8',
  },
  {
    label: 'Bore gange',
    value: 'BG9',
  },
  {
    label: 'Bore gange',
    value: 'BG10',
  },
  {
    label: 'Bore gange',
    value: 'BG11',
  },
  {
    label: 'Bore gange',
    value: 'BG12',
  },
  {
    label: 'Bore gange',
    value: 'BG13',
  },
  {
    label: 'Bore gange',
    value: 'BG14',
  },
  {
    label: 'Dialind icator',
    value: 'DI1',
  },
  {
    label: 'Dialind icator',
    value: 'DI2',
  },
  {
    label: 'Dialind icator',
    value: 'DI3',
  },
  {
    label: 'Dialind icator',
    value: 'DI4',
  },
  {
    label: 'Dialind icator',
    value: 'DI5',
  },
  {
    label: 'Flage Micrometer',
    value: 'FM1',
  },
  {
    label: 'Flage Micrometer',
    value: 'FM2',
  },
  {
    label: 'Flage Micrometer',
    value: 'FM3',
  },
  {
    label: 'Flage Micrometer',
    value: 'FM4',
  },
  {
    label: 'Flage Micrometer',
    value: 'FM5',
  },
  {
    label: 'Flage Micrometer',
    value: 'FM6',
  },
  {
    label: 'Flage Micrometer',
    value: 'FM7',
  },
  {
    label: 'Pitch Micrometer',
    value: 'PM1',
  },
  {
    label: 'Pitch Micrometer',
    value: 'PM2',
  },
  {
    label: 'Pitch Micrometer',
    value: 'PM3',
  },
  {
    label: 'Holder Gear block',
    value: 'HGB1',
  },
  {
    label: 'Holder Gear block',
    value: 'HGB2',
  },
  {
    label: 'Holder Gear block',
    value: 'HGB3',
  },
  {
    label: 'Holder Gear block',
    value: 'HGB4',
  },
  {
    label: 'Gear block',
    value: 'GB1',
  },
  {
    label: 'Gear block',
    value: 'GB2',
  },
  {
    label: 'Gear block',
    value: 'GB3',
  },
  {
    label: 'Gear block',
    value: 'GB4',
  },
  {
    label: 'Gear block',
    value: 'GB5',
  },
  {
    label: 'spirt level',
    value: 'SL1',
  },
  {
    label: 'spirt level',
    value: 'SL2',
  },
  {
    label: 'spirt level',
    value: 'SL3',
  },
  {
    label: 'spirt level',
    value: 'SL4',
  },
  {
    label: 'spirt level',
    value: 'SL5',
  },
  {
    label: 'spirt level',
    value: 'SL6',
  },
  {
    label: 'Cobmination set',
    value: 'CS1',
  },
  {
    label: 'Cobmination set',
    value: 'CS2',
  },
  {
    label: 'Cobmination set',
    value: 'CS3',
  },
  {
    label: 'Cobmination set',
    value: 'CS4',
  },
  {
    label: 'Cobmination set',
    value: 'CS5',
  },
  {
    label: 'Cobmination set',
    value: 'CS6',
  },
  {
    label: 'Cobmination set',
    value: 'CS7',
  },
  {
    label: 'Cobmination set',
    value: 'CS8',
  },
  {
    label: 'Cobmination set',
    value: 'CS9',
  },
  {
    label: 'Cobmination set',
    value: 'CS10',
  },
  {
    label: 'Cobmination set',
    value: 'CS11',
  },
  {
    label: 'Cobmination set',
    value: 'CS12',
  },
  {
    label: 'Cobmination set',
    value: 'CS13',
  },
  {
    label: 'Unirereal beel protraeto',
    value: 'UBP1',
  },
  {
    label: 'Unirereal beel protraeto',
    value: 'UBP2',
  },
  {
    label: 'Unirereal beel protraeto',
    value: 'UBP3',
  },
  {
    label: 'Unirereal beel protraeto',
    value: 'UBP4',
  },
  {
    label: 'Unirereal beel protraeto',
    value: 'UBP5',
  },
  {
    label: 'gauge holeler',
    value: 'GH1',
  },
  {
    label: 'gauge holeler',
    value: 'GH2',
  },
  {
    label: 'gauge holeler',
    value: 'GH3',
  },
  {
    label: 'gauge holeler',
    value: 'GH4',
  },
  {
    label: 'High gauge',
    value: 'HG1',
  },
  {
    label: 'High gauge',
    value: 'HG2',
  },
  {
    label: 'High gauge',
    value: 'HG3',
  },
  {
    label: 'High gauge',
    value: 'HG4',
  },
  {
    label: 'High gauge',
    value: 'HG5',
  },
  {
    label: 'High gauge',
    value: 'HG6',
  },
  {
    label: 'High gauge',
    value: 'HG7',
  },
  {
    label: 'High gauge',
    value: 'HG8',
  },
  {
    label: 'High gauge',
    value: 'HG9',
  },
  {
    label: 'eptical flate',
    value: 'OF1',
  },
  {
    label: 'eptical flate',
    value: 'OF2',
  },
  {
    label: 'eptical flate',
    value: 'OF3',
  },
  {
    label: 'eptical flate',
    value: 'OF4',
  },
  {
    label: 'Dial indicatorb stand',
    value: 'DIS1',
  },
  {
    label: 'Dial indicatorb stand',
    value: 'DIS2',
  },
  {
    label: 'Dial indicatorb stand',
    value: 'DIS3',
  },
  {
    label: 'Dial indicatorb stand',
    value: 'DIS4',
  },
  {
    label: 'Dial indicatorb stand',
    value: 'DIS5',
  },
  {
    label: 'Dial indicatorb stand',
    value: 'DIS6',
  },
  {
    label: 'Dial indicatorb stand',
    value: 'DIS7',
  },
  {
    label: 'Dial indicatorb stand',
    value: 'DIS8',
  },
  {
    label: 'Dial indicatorb stand',
    value: 'DIS9',
  },
  {
    label: 'Tylor hubson',
    value: 'TH',
  },
  {
    label: 'spring caliper',
    value: 'SC1',
  },
  {
    label: 'spring caliper',
    value: 'SC2',
  },
  {
    label: 'spring caliper',
    value: 'SC3',
  },
  {
    label: 'spring caliper',
    value: 'SC4',
  },
  {
    label: 'spring caliper',
    value: 'SC5',
  },
  {
    label: 'spring caliper',
    value: 'SC6',
  },
  {
    label: 'spring caliper',
    value: 'SC7',
  },
  {
    label: 'spring caliper',
    value: 'SC8',
  },
  {
    label: 'spring caliper',
    value: 'SC9',
  },
  {
    label: 'spring caliper',
    value: 'SC10',
  },
  {
    label: 'spring caliper',
    value: 'SC11',
  },
  {
    label: 'spring caliper',
    value: 'SC12',
  },
  {
    label: 'spring caliper',
    value: 'SC13',
  },
  {
    label: 'spring caliper',
    value: 'SC14',
  },
  {
    label: 'spring caliper',
    value: 'SC15',
  },
  {
    label: 'spring caliper',
    value: 'SC16',
  },
  {
    label: 'spring caliper',
    value: 'SC17',
  },
  {
    label: 'spring caliper',
    value: 'SC18',
  },
  {
    label: 'spring caliper',
    value: 'SC19',
  },
  {
    label: 'spring caliper',
    value: 'SC20',
  },
  {
    label: 'spring caliper',
    value: 'SC21',
  },
  {
    label: 'spring caliper',
    value: 'SC22',
  },
  {
    label: 'spring caliper',
    value: 'SC23',
  },
  {
    label: 'spring caliper',
    value: 'SC24',
  },
  {
    label: 'spring caliper',
    value: 'SC25',
  },
  {
    label: 'spring caliper',
    value: 'SC26',
  },
  {
    label: 'protraetor',
    value: 'P1',
  },
  {
    label: 'protraetor',
    value: 'P2',
  },
  {
    label: 'protraetor',
    value: 'P3',
  },
  {
    label: 'Threal Gauge',
    value: 'TG1',
  },
  {
    label: 'Threal Gauge',
    value: 'TG2',
  },
  {
    label: 'Threal Gauge',
    value: 'TG3',
  },
  {
    label: 'Threal Gauge',
    value: 'TG4',
  },
  {
    label: 'Threal Gauge',
    value: 'TG5',
  },
  {
    label: 'Threal Gauge',
    value: 'TG6',
  },
  {
    label: 'Threal Gauge',
    value: 'TG7',
  },
  {
    label: 'Threal Gauge',
    value: 'TG8',
  },
  {
    label: 'Threal Gauge',
    value: 'TG9',
  },
  {
    label: 'Threal Gauge',
    value: 'TG10',
  },
  {
    label: 'Threal Gauge',
    value: 'TG11',
  },
  {
    label: 'Threal Gauge',
    value: 'TG12',
  },
  {
    label: 'Threal Gauge',
    value: 'TG13',
  },
  {
    label: 'Threal Gauge',
    value: 'TG14',
  },
  {
    label: 'Threal Gauge',
    value: 'TG15',
  },
  {
    label: 'Threal Gauge',
    value: 'TG16',
  },
  {
    label: 'Threal Gauge',
    value: 'TG17',
  },
  {
    label: 'Threal Gauge',
    value: 'TG18',
  },
  {
    label: 'Threal Gauge',
    value: 'TG19',
  },
  {
    label: 'Threal Gauge',
    value: 'TG20',
  },
  {
    label: 'Threal Gauge',
    value: 'TG21',
  },
  {
    label: 'Threal Gauge',
    value: 'TG22',
  },
  {
    label: 'Threal Gauge',
    value: 'TG23',
  },
  {
    label: 'Threal Gauge',
    value: 'TG24',
  },
  {
    label: 'Threal Gauge',
    value: 'TG25',
  },
  {
    label: 'Roud gauge',
    value: 'RG1',
  },
  {
    label: 'Roud gauge',
    value: 'RG2',
  },
  {
    label: 'Roud gauge',
    value: 'RG3',
  },
  {
    label: 'Roud gauge',
    value: 'RG4',
  },
  {
    label: 'Roud gauge',
    value: 'RG5',
  },
  {
    label: 'Raguo Test',
    value: 'RT1',
  },
  {
    label: 'Raguo Test',
    value: 'RT2',
  },
  {
    label: 'Pin Gauge',
    value: 'PG1',
  },
  {
    label: 'Micrometer Holder',
    value: 'MH1',
  },
  {
    label: 'Micrometer Holder',
    value: 'MH2',
  },
  {
    label: 'Micrometer Holder',
    value: 'MH3',
  },
  {
    label: 'Micrometer Holder',
    value: 'MH4',
  },
  {
    label: 'Micrometer Holder',
    value: 'MH5',
  },
  {
    label: 'Micrometer Holder',
    value: 'MH6',
  },
  {
    label: ' Tride Micrometer ',
    value: 'TM1',
  },
  {
    label: ' Tride Micrometer ',
    value: 'TM2',
  },
  {
    label: ' Tride Micrometer ',
    value: 'TM3',
  },
  {
    label: 'Unirereal beel protraeto',
    value: 'UBP6',
  },
  {
    label: 'Unirereal beel protraeto',
    value: 'UBP7',
  },
  {
    label: 'Tride Micrometer ',
    value: 'TM4',
  },
  {
    label: 'sine bar',
    value: 'sb1',
  },
  {
    label: 'sine bar',
    value: 'sb2',
  },
  {
    label: 'sine bar',
    value: 'sb3',
  },
  {
    label: 'mc1',
    value: 'mc1',
  },
  {
    label: 'mc2',
    value: 'mc2',
  },
  {
    label: 'Machinist Bevel Square',
    value: 'MBS1',
  },
  {
    label: 'Machinist Bevel Square',
    value: 'MBS2',
  },
  {
    label: 'Machinist Bevel Square',
    value: 'MBS3',
  },
  {
    label: 'Machinist Bevel Square',
    value: 'MBS4',
  },
];

const formSchema = z.object({
  name: z.string(),
  tools: z.string().array(),
});

const ExperimentForm = ({
  title,
  values,
  disabled = false,
}: { title: string; values?: any; disabled?: boolean }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (_values: z.infer<typeof formSchema>) => {
    console.log(_values);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader className="border-b">{title}</CardHeader>

          <CardContent className="py-6">
            <FormField
              name="name"
              disabled={disabled}
              control={form.control}
              defaultValue={values?.name ?? ''}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input placeholder="Experiment name" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormFieldRepeater
              name="tools"
              disabled={disabled}
              control={form.control}
              defaultValue={values?.tools ?? []}
              legend="Add Tool"
              render={({ field }) => (
                <FormItem className="grow grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Tool</FormLabel>

                  <Combobox<{ label: string; value: string }>
                    label="label"
                    value="value"
                    items={tools}
                    placeholder="Search tool..."
                    options={{ threshold: 0.3, keys: ['label', 'value'] }}
                    onChange={field.onChange}
                  >
                    {({ value }) => (
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {value ? value.label : 'Select tool...'}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    )}
                  </Combobox>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />
          </CardContent>

          {disabled ? null : (
            <CardFooter className="border-t">
              <SaveButton />
            </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
};

export default ExperimentForm;
