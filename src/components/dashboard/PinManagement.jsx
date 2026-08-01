import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Plus, Trash2, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function PinManagement({ pins, refetch }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPin, setNewPin] = useState({ pin: "", employee_name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddPin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.EmployeePin.create(newPin);
    setIsSubmitting(false);
    setIsDialogOpen(false);
    setNewPin({ pin: "", employee_name: "" });
    refetch();
  };

  const handleDeletePin = async (pinId) => {
    await base44.entities.EmployeePin.update(pinId, { is_active: false });
    refetch();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5" />
          PIN Management
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1a365d] hover:bg-[#0f2744]">
              <Plus className="w-4 h-4 mr-2" />
              Add PIN
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee PIN</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pin">PIN Code *</Label>
                <Input
                  id="pin"
                  type="text"
                  value={newPin.pin}
                  onChange={(e) => setNewPin({ ...newPin, pin: e.target.value })}
                  placeholder="e.g., 104"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee_name">Employee Name</Label>
                <Input
                  id="employee_name"
                  type="text"
                  value={newPin.employee_name}
                  onChange={(e) => setNewPin({ ...newPin, employee_name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#c41e3a] hover:bg-[#9e1830]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add PIN"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {pins.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No PINs configured</p>
        ) : (
          <div className="space-y-3">
            {pins.map((pin) => (
              <motion.div
                key={pin.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-mono font-bold text-lg text-[#1a365d]">{pin.pin}</p>
                  {pin.employee_name && (
                    <p className="text-sm text-gray-600">{pin.employee_name}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete PIN?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will deactivate PIN {pin.pin}. This action can be reversed by reactivating it in the database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeletePin(pin.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
