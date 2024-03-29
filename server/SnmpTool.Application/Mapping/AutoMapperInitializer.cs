﻿using AutoMapper;

namespace SnmpTool.Application.Mapping
{
    public class AutoMapperInitializer
    {
        public static void Initialize()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfiles(typeof(AutoMapperInitializer));
            });
        }

        public static void Reset() => Mapper.Reset();
    }
}
