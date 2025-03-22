
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Search, Trash2, UserPlus, UserCheck, UserX } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const SubscribersAdmin: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState(null);
  const [newSubscriber, setNewSubscriber] = useState({
    name: '',
    email: '',
    active: true,
    language: language
  });

  // Fetch subscribers
  const { data: subscribers = [], refetch, isLoading } = useQuery({
    queryKey: ['newsletter_subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching subscribers:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  // Filter subscribers based on search term and status
  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = 
      (subscriber.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && subscriber.active) || 
      (statusFilter === 'inactive' && !subscriber.active);
    
    return matchesSearch && matchesStatus;
  });

  // Handle subscriber status change
  const handleStatusChange = async (subscriberId, isActive) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ active: isActive })
        .eq('id', subscriberId);
      
      if (error) throw error;
      
      refetch();
      toast.success(`Subscriber ${isActive ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('Error updating subscriber status:', error);
      toast.error('Failed to update subscriber status');
    }
  };

  // Handle adding a new subscriber
  const handleAddSubscriber = async (e) => {
    e.preventDefault();
    
    if (!newSubscriber.email) {
      toast.error('Email is required');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            name: newSubscriber.name || null,
            email: newSubscriber.email,
            active: newSubscriber.active,
            language: newSubscriber.language
          }
        ]);
      
      if (error) {
        if (error.code === '23505') { // Unique violation
          toast.error('This email is already subscribed');
        } else {
          throw error;
        }
      } else {
        refetch();
        setNewSubscriber({
          name: '',
          email: '',
          active: true,
          language: language
        });
        setIsAddDialogOpen(false);
        toast.success('Subscriber added successfully');
      }
    } catch (error) {
      console.error('Error adding subscriber:', error);
      toast.error('Failed to add subscriber');
    }
  };

  // Handle subscriber deletion
  const handleDeleteSubscriber = async () => {
    if (!subscriberToDelete) return;
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', subscriberToDelete.id);
      
      if (error) throw error;
      
      refetch();
      toast.success('Subscriber deleted successfully');
      setIsDeleteDialogOpen(false);
      setSubscriberToDelete(null);
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast.error('Failed to delete subscriber');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <AdminLayout 
      title="Newsletter Subscribers" 
      description="View and manage email newsletter subscribers"
      icon={<Mail className="mr-2 h-8 w-8" />}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subscribers..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subscribers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Subscriber
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredSubscribers.length === 0 ? (
          <div className="bg-muted py-12 text-center rounded-lg">
            <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No subscribers found</h3>
            <p className="text-muted-foreground mt-2">
              {searchTerm || statusFilter !== 'all' 
                ? "Try changing your search or filter settings" 
                : "You don't have any newsletter subscribers yet"}
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Your First Subscriber
            </Button>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell>{subscriber.name || '-'}</TableCell>
                    <TableCell className="uppercase">{subscriber.language}</TableCell>
                    <TableCell>{formatDate(subscriber.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={subscriber.active}
                          onCheckedChange={(checked) => handleStatusChange(subscriber.id, checked)}
                          id={`status-${subscriber.id}`}
                        />
                        <Label htmlFor={`status-${subscriber.id}`}>
                          {subscriber.active ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-800">
                              Inactive
                            </Badge>
                          )}
                        </Label>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {subscriber.active ? (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleStatusChange(subscriber.id, false)}
                            title="Deactivate subscriber"
                          >
                            <UserX className="h-4 w-4" />
                            <span className="sr-only">Deactivate</span>
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleStatusChange(subscriber.id, true)}
                            title="Activate subscriber"
                          >
                            <UserCheck className="h-4 w-4" />
                            <span className="sr-only">Activate</span>
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            setSubscriberToDelete(subscriber);
                            setIsDeleteDialogOpen(true);
                          }}
                          title="Delete subscriber"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Add Subscriber Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subscriber</DialogTitle>
            <DialogDescription>
              Add a new subscriber to your newsletter mailing list.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddSubscriber}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subscriber-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="subscriber-email"
                  type="email"
                  value={newSubscriber.email}
                  onChange={(e) => setNewSubscriber({...newSubscriber, email: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subscriber-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="subscriber-name"
                  value={newSubscriber.name}
                  onChange={(e) => setNewSubscriber({...newSubscriber, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subscriber-language" className="text-right">
                  Language
                </Label>
                <Select 
                  value={newSubscriber.language} 
                  onValueChange={(value) => setNewSubscriber({...newSubscriber, language: value})}
                >
                  <SelectTrigger id="subscriber-language" className="col-span-3">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subscriber-status" className="text-right">
                  Status
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="subscriber-status"
                    checked={newSubscriber.active}
                    onCheckedChange={(checked) => setNewSubscriber({...newSubscriber, active: checked})}
                  />
                  <Label htmlFor="subscriber-status">
                    {newSubscriber.active ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Subscriber</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Subscriber</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {subscriberToDelete?.email} from your newsletter subscribers? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSubscriber}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default SubscribersAdmin;
