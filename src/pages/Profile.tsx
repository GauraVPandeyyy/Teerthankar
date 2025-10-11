import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, Heart, LogOut, Edit2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || ''
  });

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Mock order data
  const orders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      total: 2499,
      status: 'Delivered',
      items: 2
    },
    {
      id: 'ORD002',
      date: '2024-01-20',
      total: 3999,
      status: 'Shipped',
      items: 1
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Card className="p-6 h-fit">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center text-white text-2xl font-bold mb-3">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <h2 className="font-semibold text-lg">{user?.name || 'Guest User'}</h2>
              <p className="text-sm text-muted-foreground">{user?.mobile}</p>
            </div>

            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Package className="w-4 h-4 mr-2" />
                Orders
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/wishlist')}
              >
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </nav>
          </Card>

          {/* Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList>
                <TabsTrigger value="profile">Profile Details</TabsTrigger>
                <TabsTrigger value="orders">Order History</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Profile Information</h2>
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground">
                          {order.items} {order.items === 1 ? 'item' : 'items'}
                        </p>
                        <p className="text-xl font-bold">₹{order.total.toLocaleString()}</p>
                      </div>
                    </Card>
                  ))}

                  {orders.length === 0 && (
                    <Card className="p-12 text-center">
                      <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Start shopping to see your orders here
                      </p>
                      <Button onClick={() => navigate('/shop')}>
                        Browse Products
                      </Button>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
