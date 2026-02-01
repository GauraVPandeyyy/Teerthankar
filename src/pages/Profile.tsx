import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Package, Heart, LogOut, Edit2, ArrowRight, Settings, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import * as api from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile } = useAuth();

  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

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
console.log("user", user);
console.log("profile data", api.getProfile())
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSaveProfile = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const loadOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await api.getOrderHistory();
      setOrders(res?.Orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);
  return (
    <div className="min-h-screen bg-background py-12 md:py-20 mt-[80px]">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          
          {/* SIDEBAR */}
          <div className="md:w-1/4">
             <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 sticky top-24 text-center">
                <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 text-2xl font-serif font-bold">
                  {user?.name?.[0] || "U"}
                </div>
                <h2 className="font-serif text-xl font-bold text-slate-900">{user?.name}</h2>
                <p className="text-sm text-slate-500 mb-6">{user?.email}</p>
                
                <Button 
                  variant="outline" 
                  onClick={() => { logout(); navigate('/'); }}
                  className="w-full border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
             </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1">
             <Tabs defaultValue="orders" className="w-full">
               <TabsList className="bg-white p-1 rounded-full border border-slate-100 mb-8 h-12 w-fit">
                 <TabsTrigger value="orders" className="rounded-full px-6 data-[state=active]:bg-slate-900 data-[state=active]:text-white">
                   <Package className="w-4 h-4 mr-2" /> My Orders
                 </TabsTrigger>
                 <TabsTrigger value="settings" className="rounded-full px-6 data-[state=active]:bg-slate-900 data-[state=active]:text-white">
                   <Settings className="w-4 h-4 mr-2" /> Settings
                 </TabsTrigger>
               </TabsList>

               {/* ORDERS TAB */}
               <TabsContent value="orders" className="space-y-6">
                 <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">Order History</h2>
                 
                 {loadingOrders ? (
                   <div>Loading...</div>
                 ) : orders.length === 0 ? (
                   <div className="bg-white p-12 rounded-[2rem] text-center border border-slate-100">
                     <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                     <h3 className="font-bold text-lg">No orders yet</h3>
                     <p className="text-slate-500 mb-6">Start your collection today.</p>
                     <Link to="/shop"><Button>Browse Shop</Button></Link>
                   </div>
                 ) : (
                   orders.map((order) => (
                     <div key={order.order_id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="text-center sm:text-left">
                          <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Order #{order.order_id}</p>
                          <h3 className="font-serif text-lg font-bold text-slate-900">₹{Number(order.total_amount).toLocaleString()}</h3>
                          <p className="text-sm text-slate-500">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        
                        <div className="px-4 py-1 bg-amber-50 text-amber-700 text-sm font-medium rounded-full">
                          {order.order_status}
                        </div>

                        <Link to={`/order/${order.order_id}`}>
                          <Button variant="outline" className="rounded-full border-slate-200">
                            Details <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                     </div>
                   ))
                 )}
               </TabsContent>

               {/* SETTINGS TAB */}
               <TabsContent value="settings">
                 <div className="bg-white p-8 rounded-[2rem] border border-slate-100">
                   <div className="flex justify-between items-center mb-6">
                     <h2 className="font-serif text-2xl font-bold text-slate-900">Profile Details</h2>
                     <Button 
                       variant="ghost" 
                       onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                       className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                     >
                       {isEditing ? "Save Changes" : "Edit Profile"}
                     </Button>
                   </div>
                   
                   <div className="grid gap-6 max-w-lg">
                     <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-700">Full Name</label>
                       <Input 
                         value={formData.name} 
                         disabled={!isEditing} 
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         className="bg-slate-50 border-slate-200 h-12" 
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-700">Email Address</label>
                       <Input 
                         value={formData.email} 
                         disabled={!isEditing} 
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                         className="bg-slate-50 border-slate-200 h-12" 
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-700">Phone Number</label>
                       <Input 
                         value={formData.mobile} 
                         disabled={!isEditing} 
                         onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                         className="bg-slate-50 border-slate-200 h-12" 
                       />
                     </div>
                   </div>
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