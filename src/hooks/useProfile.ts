import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

export type ProfileData = {
  first_name: string;
  last_name: string;
  phone?: string;
  organization?: string;
  city: string;
  state: string;
  zip: string;
};

export const useProfile = (user: User | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const fetchProfile = async () => {
    if (!user?.id) return null;

    console.log("Fetching profile for user:", user.id);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      console.log("Profile data received:", data);

      if (!data) {
        // Profile doesn't exist, create it
        console.log("Creating new profile for user:", user.id);
        const newProfile = {
          id: user.id,
          first_name: "",
          last_name: "",
          phone: "",
          organization: "",
          city: "",
          state: "",
          zip: "",
        };

        const { data: createdProfile, error: insertError } = await supabase
          .from("profiles")
          .insert([newProfile])
          .select()
          .single();

        if (insertError) {
          console.error("Error creating profile:", insertError);
          throw insertError;
        }

        console.log("New profile created:", createdProfile);
        return createdProfile;
      }

      return data;
    } catch (error) {
      console.error("Error in profile operation:", error);
      toast.error("Failed to load profile data. Please try refreshing the page.");
      return null;
    }
  };

  const updateProfile = async (data: ProfileData) => {
    if (!user?.id) return;
    
    setIsLoading(true);
    console.log("Updating profile for user:", user.id, "with data:", data);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          ...data,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
      
      console.log("Profile updated successfully");
      toast.success("Profile updated successfully");
      setProfile(data);
    } catch (error) {
      console.error("Error in profile update:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      console.log("Loading profile...");
      const data = await fetchProfile();
      if (data) {
        console.log("Setting profile data:", data);
        setProfile(data);
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user]);

  return { profile, isLoading, updateProfile };
};