package com.niantic.models.authentication;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;
import java.util.Objects;

@Setter
@Getter
public class Authority implements Serializable, GrantedAuthority
{

   private String name;

   public Authority(String name)
   {
      this.name = name;
   }

   @Override
   public boolean equals(Object o)
   {
      if (this == o)
      {
         return true;
      }
      if (o == null || getClass() != o.getClass())
      {
         return false;
      }
      Authority authority = (Authority) o;
      return name.equals(authority.name);
   }

   @Override
   public int hashCode()
   {
      return Objects.hash(name);
   }

   @Override
   public String toString()
   {
      return "Authority{" +
              "name=" + name +
              '}';
   }

   @JsonIgnore
   @Override
   public String getAuthority()
   {
      return this.name;
   }
}
