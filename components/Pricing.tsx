import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Adventurer",
    popular: 0,
    price: 9.99,
    description:
      "An ideal tier for those embarking on their AI journey, offering a solid foundation of features at a great value.",
    buttonText: "Get Started",
    benefitList: [
      "Unlimited Premium AI Models",
      "Standard AI Speed Boost",
      "480 Monthly Credits",
      "Standard Memory",
    ],
  },
  {
    title: "Hero",
    popular: 1,
    price: 14.99,
    description:
      "For the accomplished explorer, our Hero tier accelerates your AI exploits with enhanced capabilities.",
    buttonText: "Start Free Trial",
    benefitList: [
      "Unlimited Premium AI Models",
      "Standard AI Speed Boost",
      "760 Monthly Credits",
      "2x Memory",
    ],
  },
  {
    title: "Legend",
    popular: 0,
    price: 29.99,
    description:
      "The ultimate choice for AI virtuosos, the Legend tier provides unparalleled access and perks.",
    buttonText: "Contact US",
    benefitList: [
      "Unlimited Premium AI Models",
      "Premium AI Speed Boost",
      "1,650 Monthly Credits",
      "4x Memory",
      "Unlimited Image Generation",
    ],
  },
];
export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Free to play

      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
A better experience.
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge
                    variant="secondary"
                    className="text-sm text-primary"
                  >
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">${pricing.price}</span>
                <span className="text-muted-foreground"> /month</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button className="w-full">{pricing.buttonText}</Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span
                    key={benefit}
                    className="flex"
                  >
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
