import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Scale } from "lucide-react";
import AddWeightDialog from "@/components/AddWeight";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const [weights, setWeights] = useState([65, 70, 75]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/logout");
      if (response.data.success) {
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
      navigate("/");
    }
  };

  const addWeight = (newWeight: number) => {
    setWeights([...weights, newWeight]);
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div className="flex items-center space-x-2">
            <Scale className="h-6 w-6 text-orange-500" />
            <CardTitle className="text-2xl font-bold">Weight Tracker</CardTitle>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="h-4 w-4" />
            <span>Add Weight</span>
          </Button>
        </CardHeader>
        <CardContent>
          {weights.length > 0 ? (
            <div className="grid gap-4">
              {weights.map((weight, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    <span className="text-lg font-medium">{weight} kg</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Entry #{index + 1}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No weight entries yet. Click "Add Weight" to get started.
            </div>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors mt-4"
          >
            Logout
          </button>
        </CardContent>
      </Card>

      <AddWeightDialog
        onAddWeight={addWeight}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default Main;
