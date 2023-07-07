import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  setActiveFilterCountries,
  setActiveFilterRoles,
} from "@/redux/slices/filterSlice";

type Country = {
  id: string;
  name: string;
};
type Role = {
  id: string;
  name: string;
};

const Filter = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const activeFilters = useAppSelector((state) => state.filter.activeFilter);
  useEffect(() => {
    const fetchFilters = () => {
      void axios.get<Country[]>("/countries.json").then((res) => {
        setCountries(res.data);
      });
      void axios.get<Role[]>("/roles.json").then((res) => {
        setRoles(res.data);
      });
    };
    fetchFilters();
  }, []);
  const handleCountryFilter = (country: string) => {
    if (!activeFilters?.countries?.includes(country)) {
      if (activeFilters?.countries?.length) {
        dispatch(
          setActiveFilterCountries([...activeFilters.countries, country])
        );
        return;
      } else {
        dispatch(setActiveFilterCountries([country]));
      }
      return;
    } else if (activeFilters?.countries?.includes(country)) {
      const filteredCountries = activeFilters.countries.filter(
        (activeCountry) => activeCountry !== country
      );
      dispatch(setActiveFilterCountries(filteredCountries));
    }
  };
  const handleRoleFilter = (role: string) => {
    if (!activeFilters?.roles?.includes(role)) {
      if (activeFilters?.roles?.length) {
        dispatch(setActiveFilterRoles([...activeFilters.roles, role]));
        return;
      } else {
        dispatch(setActiveFilterRoles([role]));
      }
      return;
    } else if (activeFilters?.roles?.includes(role)) {
      console.log({
        roles: activeFilters.roles,
        check: activeFilters.roles.includes(role),
      });
      const filteredRoles = activeFilters.roles.filter(
        (activeRole) => activeRole !== role
      );
      dispatch(setActiveFilterRoles(filteredRoles));
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild title="filter">
        <div className="filter hover:bg-border/60 cursor-pointer p-2 rounded-xl transition-colors">
          <img className="w-6 h-6" src="/icon/filter.svg" alt="" />
        </div>
      </DialogTrigger>
      <DialogContent className="container-custom-xs">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            Filter candidates by location or role
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="country" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="country">Country</TabsTrigger>
            <TabsTrigger value="role">Role</TabsTrigger>
          </TabsList>
          <TabsContent value="country">
            <Card>
              <CardHeader>
                <CardTitle>Country</CardTitle>
                <CardDescription>Filter candidates by country</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 grid grid-cols-2 gap-x-4 gap-y-2">
                {countries.map((country) => (
                  <div
                    className="input-group flex gap-2 items-center"
                    key={country.id}
                  >
                    <Checkbox
                      label={country.name}
                      id={country.id}
                      onCheckedChange={() => handleCountryFilter(country.name)}
                      checked={activeFilters?.countries?.includes(country.name)}
                    />
                    <Label className="cursor-pointer" htmlFor={country.id}>
                      {country.name}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="role">
            <Card>
              <CardHeader>
                <CardTitle>Role</CardTitle>
                <CardDescription>Filter candidates by role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 grid grid-cols-2 gap-x-4 gap-y-2">
                {roles.map((role) => (
                  <div
                    className="input-group flex gap-2 items-center"
                    key={role.id}
                  >
                    <Checkbox
                      label={role.name}
                      id={role.id}
                      onCheckedChange={() => handleRoleFilter(role.name)}
                      checked={activeFilters?.roles?.includes(role.name)}
                    />
                    <Label className="cursor-pointer" htmlFor={role.id}>
                      {role.name}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Filter;
