import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const AddWeightDialog: React.FC<{
  onAddWeight: (weight: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ onAddWeight, open, onOpenChange }) => {
  const [weight, setWeight] = useState<number | "">("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (weight && !isNaN(Number(weight))) {
      onAddWeight(Number(weight));
      setWeight("");
      onOpenChange(false);
    } else {
      setError("Please enter a valid number for weight");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Weight</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) =>
                setWeight(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Enter your weight"
              className="text-lg"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full text-lg font-medium bg-orange-500 hover:bg-orange-600"
          >
            Save Weight
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWeightDialog;
